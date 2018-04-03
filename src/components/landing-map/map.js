import Vue from 'vue'
import mapTemplate from './map.html'
import { EventBus } from '../common/event-bus'
import indicatorPanel from '../indicatorPanel/indicator-panel.js'
import mapLegend from '../legend/legend.js'
import axios from 'axios'
import worldMap from './world-map'
import helper from './map-helper'
import { merge } from 'lodash'

export default Vue.extend({
  components: {
    indicatorPanel, mapLegend
  },
  data () {
    // Todo: Remove mapData and directly return data
    this.mapData = {
      globalHealthIndices: [],
      lastSelectedCountry: '',
      globalHealthIndicators: [],
      categoryValue: '',
      phaseValue: '',
      categories: [],
      phases: []
    }
    return this.mapData
  },
  created () {
    this.categoryValue = window.appProperties.getCategoryFilter()
    this.phaseValue = window.appProperties.getPhaseFilter()
    this.fetchGlobalIndices()
    this.fetchCategoricalIndicators()
    this.fetchPhases()
  },
  mounted: function () {
    console.log('map mounted')
    EventBus.$on('Map:Searched', this.onSearchTriggered)
    this.$on('Map:Clicked', ($clickedEl) => {
      if ($clickedEl.type === 'GLOBAL') {
        this.resetFilters();
        document.querySelector("#search-box input").value = '';
      } else {
        document.querySelector("#search-box input").value = $clickedEl.countryName;
      }
    })
  },
  beforeDestroy () {
    console.log('map destroyed')
    EventBus.$off('Map:Searched', this.onSearchTriggered)
  },
  methods: {

    filter: function () {
      console.log('selected cat id ' + this.categoryValue)
      window.appProperties.setCategoryFilter({categoryId: this.categoryValue})
      window.appProperties.setPhaseFilter({phaseId: this.phaseValue})
      this.$emit('filtered')
      this.fetchGlobalIndices()
    },

    resetFilters: function () {
      this.categoryValue = ''
      this.phaseValue = ''
      this.filter()
    },

    fetchGlobalIndices: function () {
      var self = this
      const loadingElement = document.querySelector(".loading");
      if(loadingElement)
        loadingElement.style.display = "block";
      var windowProperties = window.appProperties
      return axios.get('/api/countries_health_indicator_scores?categoryId=' + windowProperties.getCategoryFilter() + '&phase=' + windowProperties.getPhaseFilter())
        .then(function (globalHealthIndices) {
          self.globalHealthIndicators = globalHealthIndices.data.countryHealthScores;
          self.globalHealthIndices = self.mergeColorCodeToHealthIndicators(
            globalHealthIndices);
          worldMap.drawMap(self.globalHealthIndices, self.onCountrySelection.bind(self));
          if(loadingElement)
            loadingElement.style.display = "none";
        })
    },
    fetchCategoricalIndicators: function () {
      var self = this
      return axios.get('/api/health_indicator_options').then(function (categories) {
        self.categories = categories.data
      })
    },
    fetchPhases: function () {
      var self = this
      self.phases = [{phaseValue: 1, phaseName: 'Phase 1'},
        {phaseValue: 2, phaseName: 'Phase 2'},
        {phaseValue: 3, phaseName: 'Phase 3'},
        {phaseValue: 4, phaseName: 'Phase 4'},
        {phaseValue: 5, phaseName: 'Phase 5'}]
      return self.phases
    },
    mergeColorCodeToHealthIndicators: function (globalHealthIndices) {
      var globalHealthIndicesWithScores = globalHealthIndices.data.countryHealthScores.filter((country) => {
        return country.overallScore != null
      });
      var collection = globalHealthIndicesWithScores
      collection.forEach((value) => {
        merge(value, {
          'colorCode': helper.getColorCodeFor(value['countryPhase'])
        })
      });
      return collection
    },
    onCountrySelection (countryCode) {
      this.$emit('Map:Clicked', countryCode)
    },
    onSearchTriggered (countryCode) {
      worldMap.handleSearch(countryCode, this.onCountrySelection.bind(this))
    }
  },
  template: mapTemplate,
})
