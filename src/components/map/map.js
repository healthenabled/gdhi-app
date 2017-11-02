import Vue from 'vue'
import map from './map.html'
import worldMap from './google-world'
import axios from 'axios'

export default Vue.extend({
  template: map,
  name: 'mappage',
  data () {
    this.mapData = {
      globalHealthIndices: []
    }
    return this.mapData
  },
  created () {
    console.log('In created', process.env.MAP_KEY)
    var self = this
    self.fetchGlobalIndices()
    const fusionapiUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT sov_a3, name_sort, kml_4326 ' +
      'FROM 1foc3xO9DyfSIF6ofvN0kp2bxSfSeKog5FbdWdQ&key=' + process.env.MAP_KEY
    console.log('Fusion Url', fusionapiUrl)
    axios.get(fusionapiUrl)
      .then(function (response) {
        self.boundaries = response.data
        console.log('Response', self.boundaries)
        var map = worldMap.drawMap(self.boundaries, document.getElementById('map-canvas'))
        worldMap.bindEventsToMap(self.boundaries, {},
          map)
      })
  },

  methods: {
    fetchGlobalIndices: function (callback, map) {
      var self = this
      axios.get('/api/countrylist')
        .then(function (response) {
          self.$set(self.mapData, 'globalHealthIndices', [{
            'country_name': 'India',
            'country_code': 'IND',
            'catagory': 'Cat 1',
            'indicator_description': 'Indicator 1',
            'indicator_name': 'Name',
            'indicator_score': 2,
            'color_code': '#225e8e'
          }])
        })
        .catch(function (err) {
          console.log('Error', err)
        })
    }
  }

})
