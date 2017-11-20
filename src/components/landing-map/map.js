import Vue from 'vue'
import mapTemplate from './map.html'
import { EventBus } from '../common/event-bus'
import indicatorPanel from '../indicatorPanel/indicator-panel.js'
import mapLegend from '../legend/legend.js'
import axios from 'axios'
import worldMap from './world-map'
import helper from './map-helper'
import _ from 'lodash'

export default Vue.extend({
  components: {
    indicatorPanel, mapLegend
  },
  template: mapTemplate,
  data () {
    this.mapData = {
      globalHealthIndices: [],
      lastSelectedCountry: ''
    }
    return this.mapData
  },
  created () {
    this.fetchGlobalIndices()
  },
  mounted: function () {
    var self = this
    EventBus.$on('Map:Searched', function (countryCode) {
      worldMap.handleSearch(countryCode, self.onCountrySelection.bind(self))
    })
    EventBus.$emit('showCountrySearch', true)
  },
  methods: {
    fetchGlobalIndices: function () {
      var self = this
      axios.get('/api/countries_health_indicator_scores')
        .then(function (globalHealthIndices) {
          self.globalHealthIndices = self.mergeColorCodeToHealthIndicators(
            globalHealthIndices)
          worldMap.drawMap(self.globalHealthIndices, self.onCountrySelection.bind(self))
        })
    },
    mergeColorCodeToHealthIndicators: function (globalHealthIndices) {
      var collection = globalHealthIndices.data.countryHealthScores
      _.forEach(collection, function (value) {
        _.merge(value, {
          'colorCode': helper.getColorCodeFor(value['countryPhase'])
        })
      })
      return collection
    },
    onCountrySelection (countryCode) {
      this.$emit('Map:Clicked', countryCode)
    }
  }
})
