import Vue from 'vue'
import mapTemplate from './map.html'
import { EventBus } from '../common/event-bus'
import indicatorPanel from '../indicatorPanel/indicator-panel.js'
import mapLegend from '../legend/legend.js'
import axios from 'axios'
import worldMap from './world-map'
import exportData from '../exportData/export-data.js'
import helper from './map-helper'
import _ from 'lodash'

export default Vue.extend({
  components: {
    indicatorPanel, mapLegend, exportData
  },
  template: mapTemplate,
  data () {
    this.mapData = {
      globalHealthIndices: [],
      lastSelectedCountry: '',
      globalHealthIndicators: []
    }
    return this.mapData
  },
  created () {
    this.fetchGlobalIndices()
  },
  mounted: function () {
    console.log('map mounted')
    EventBus.$on('Map:Searched', this.onSearchTriggered)
  },
  beforeDestroy () {
    console.log('map destroyed')
    EventBus.$off('Map:Searched', this.onSearchTriggered)
  },
  methods: {
    fetchGlobalIndices: function () {
      var self = this
      axios.get('/api/countries_health_indicator_scores')
        .then(function (globalHealthIndices) {
          self.globalHealthIndicators = globalHealthIndices.data.countryHealthScores
          self.globalHealthIndices = self.mergeColorCodeToHealthIndicators(
            globalHealthIndices)
          worldMap.drawMap(self.globalHealthIndices, self.onCountrySelection.bind(self))
        })
    },
    mergeColorCodeToHealthIndicators: function (globalHealthIndices) {
      var globalHealthIndicesWithScores = _.filter(globalHealthIndices.data.countryHealthScores, function (country) {
        return country.overallScore != null
      })
      var collection = globalHealthIndicesWithScores
      _.forEach(collection, function (value) {
        _.merge(value, {
          'colorCode': helper.getColorCodeFor(value['countryPhase'])
        })
      })
      return collection
    },
    onCountrySelection (countryCode) {
      this.$emit('Map:Clicked', countryCode)
    },
    onSearchTriggered (countryCode) {
      worldMap.handleSearch(countryCode, this.onCountrySelection.bind(this))
    }
  }
})
