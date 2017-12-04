import Vue from 'vue'
import mapTemplate from './map.html'
import { EventBus } from '../common/event-bus'
import indicatorPanel from '../indicatorPanel/indicator-panel.js'
import mapLegend from '../legend/legend.js'
import axios from 'axios'
import worldMap from './world-map'

export default Vue.extend({
  components: {
    indicatorPanel, mapLegend
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
      return axios.get('/api/countries_health_indicator_scores')
        .then(function (globalHealthIndices) {
          self.globalHealthIndicators = globalHealthIndices.data.countryHealthScores
          worldMap.drawMap(self.globalHealthIndicators, self.onCountrySelection.bind(self))
        })
    },
    onCountrySelection (countryCode) {
      this.$emit('Map:Clicked', countryCode)
    },
    onSearchTriggered (countryCode) {
      worldMap.handleSearch(countryCode, this.onCountrySelection.bind(this))
    }
  }
})
