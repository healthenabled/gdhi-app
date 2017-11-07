import Vue from 'vue'
import map from './map.html'
import worldMap from './google-world'
import healthIndicator from '../healthIndicator/health-indicator.js'
import mapLegend from '../legend/legend.js'
import axios from 'axios'

export default Vue.extend({
  template: map,
  name: 'mappage',
  components: { healthIndicator, mapLegend },

  data () {
    this.mapData = {
      globalHealthIndices: []
    }
    return this.mapData
  },
  created () {
    var self = this
    axios.all([self.fetchGlobalIndices(), self.fetchGlobalMapData()])
      .then(axios.spread(function (healthIndices, mapData) {
        self.boundaries = mapData.data
        console.log('Response', self.boundaries)
        self.stubData()
        var map = worldMap.drawMap(self.boundaries, document.getElementById('map-canvas'))
        worldMap.bindEventsToMap(self.boundaries, self.mapData.globalHealthIndices,
          map)
      }))
  },

  methods: {
    fetchGlobalMapData () {
      const fusionapiUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT sov_a3, name_sort, kml_4326 ' +
        'FROM 1foc3xO9DyfSIF6ofvN0kp2bxSfSeKog5FbdWdQ&key=' + process.env.MAP_KEY
      console.log('Fusion Url', fusionapiUrl)
      return axios.get(fusionapiUrl)
    },

    fetchGlobalIndices: function (callback, map) {
      return axios.get('/api/countries')
    },
    stubData () {
      this.$set(this.mapData, 'globalHealthIndices', [{
        'country_name': 'Afghanistan',
        'country_code': 'AFG',
        'catagory': 'Cat 1',
        'indicator_description': 'Indicator 1',
        'indicator_name': 'Name',
        'indicator_score': 2,
        'color_code': '#225e8e'
      },
      {
        'country_name': 'Russia',
        'country_code': 'RUS',
        'catagory': 'Cat 1',
        'indicator_description': 'Indicator 1',
        'indicator_name': 'Name',
        'indicator_score': 2,
        'color_code': '#225e8e'
      }])
    }
  }

})
