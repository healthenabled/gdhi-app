import Vue from 'vue'
import map from './map.html'
import worldMap from './google-world'
import indicatorPanel from '../indicatorPanel/indicator-panel.js'
import mapLegend from '../legend/legend.js'
import axios from 'axios'
import colors from '../common/color-codes.js'
import _ from 'lodash'
import { EventBus } from '../common/event-bus'

export default Vue.extend({
  template: map,
  name: 'mappage',
  components: { indicatorPanel, mapLegend },

  data () {
    this.mapData = {
      globalHealthIndices: []
    }
    return this.mapData
  },

  mounted () {
    EventBus.$on('countrySearched', (countryCode) => { return this.onCountrySearched(countryCode) })
  },

  created () {
    var self = this
    axios.all([self.fetchGlobalIndices(), self.fetchGlobalMapData()])
      .then(axios.spread(function (globalHealthIndices, mapData) {
        self.boundaries = mapData.data
        var map = worldMap.drawMap(self.boundaries, document.getElementById('map-canvas'))
        worldMap.bindEventsToMap(self.boundaries, self.mergeColorCodeToHealthIndicators(globalHealthIndices, self),
          map, self.onCountrySelection.bind(self))
      }))
  },

  methods: {
    fetchGlobalMapData () {
      const fusionapiUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT adm0_a3, name_sort, kml_4326 ' +
        'FROM 1foc3xO9DyfSIF6ofvN0kp2bxSfSeKog5FbdWdQ&key=' + process.env.MAP_KEY
      console.log('Fusion Url', fusionapiUrl)
      return axios.get(fusionapiUrl)
    },

    onCountrySearched (countryCode) {
      console.log(countryCode)
      worldMap.doOnSearch(countryCode)
    },

    mergeColorCodeToHealthIndicators: function (globalHealthIndices, self) {
      var collection = globalHealthIndices.data.countryHealthScores
      _.forEach(collection, function (value) {
        _.merge(value, {
          'colorCode': self.getColorCodeFor(value['countryPhase'])
        })
      })
      return collection
    },

    getColorCodeFor (score) {
      var colorCodes = colors.getColorCodes()
      var colorHashArray = colorCodes.filter(function (c) {
        return !score ? 'NA' : c['score'] === JSON.stringify(score)
      })
      return colorHashArray.length !== 0 ? colorHashArray[0]['color'] : '#606060'
    },

    fetchGlobalIndices: function () {
      return axios.get('/api/global_health_indicators')
    },

    onCountrySelection (country) {
      this.$emit('countrySelectionChanged', country)
    }
  }

})
