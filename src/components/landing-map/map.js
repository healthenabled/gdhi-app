import Vue from 'vue';
import mapTemplate from './map.html';
import {EventBus} from '../common/event-bus';
import indicatorPanel from '../indicatorPanel/indicator-panel.js';
import MapLegend from '../legend/legend.js';
import axios from 'axios';
import worldMap from './world-map';
import helper from './map-helper';
import {merge} from 'lodash';
import common from '../../common/common';

export default Vue.extend({
  components: {
    indicatorPanel, MapLegend
  },
  data () {
    return {
      globalHealthIndices: [],
      lastSelectedCountry: '',
      globalHealthIndicators: [],
      categoryValue: '',
      phaseValue: '',
      categories: [],
      phases: [],
      locale:'en',
    }
  },
  created () {
    this.categoryValue = window.appProperties.getCategoryFilter()
    this.phaseValue = window.appProperties.getPhaseFilter()
    this.fetchGlobalIndices()
    this.fetchCategoricalIndicators()
    this.fetchPhases()
  },
  mounted: function () {
    EventBus.$on('Map:Searched', this.onSearchTriggered)
    this.$on('Map:Clicked', ($clickedEl) => {
      if ($clickedEl.type === 'GLOBAL') {
        this.resetFilters();
        if (document.querySelector("#search-box input"))
          document.querySelector("#search-box input").value = '';
      } else {
        if (document.querySelector("#search-box input"))
          document.querySelector("#search-box input").value = $clickedEl.countryName;
      }
    })
  },
  updated() {
    if (this.locale !== this.$i18n.locale) {
      this.fetchCategoricalIndicators();
      this.fetchGlobalIndices();
      this.locale = this.$i18n.locale;
    }
  },
  beforeDestroy () {
    EventBus.$off('Map:Searched', this.onSearchTriggered)
  },
  methods: {

    filter: function () {
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
      const self = this;
      common.showLoading();
      const windowProperties = window.appProperties;
      let url = '/api/countries_health_indicator_scores?categoryId=' + windowProperties.getCategoryFilter() + '&phase=' + windowProperties.getPhaseFilter();
      return axios.get(url, common.configWithUserLanguageAndNoCacheHeader(this.$i18n.locale))
        .then((globalHealthIndices) => {
          this.globalHealthIndicators = globalHealthIndices.data.countryHealthScores;
          this.globalHealthIndices = self.mergeColorCodeToHealthIndicators(
            globalHealthIndices);
          worldMap.drawMap(self.globalHealthIndices, self.onCountrySelection, this.$i18n);
          common.hideLoading();
        })
    },
    fetchCategoricalIndicators: function () {
      const self = this;
      return axios.get('/api/health_indicator_options', common.configWithUserLanguageAndNoCacheHeader(this.$i18n.locale))
        .then((categories) => {
        self.categories = categories.data
      })
    },
    fetchPhases: function () {
      const self = this;
      axios.get('/api/phases').then((response) => {
        self.phases = response.data;
      });
    },
    mergeColorCodeToHealthIndicators: function (globalHealthIndices) {
      const globalHealthIndicesWithScores = globalHealthIndices.data.countryHealthScores.filter((country) => {
        return country.countryPhase != null
      });
      const collection = globalHealthIndicesWithScores;
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
      worldMap.handleSearch(countryCode, this.onCountrySelection)
    }
  },
  template: mapTemplate,
})
