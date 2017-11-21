import Vue from 'vue'
import countryList from './country-list.html'
import exportData from '../exportData/export-data.js'
import axios from 'axios'
import _ from 'lodash'

export default Vue.extend({
  template: countryList,
  name: 'country-list',
  components: {
    exportData
  },
  data () {
    return {
      countryList: [],
      globalHealthIndicators: []
    }
  },

  created () {
    var self = this
    self.getListOfCountries().then(globalHealthIndices => {
      self.globalHealthIndicators = globalHealthIndices.data.countryHealthScores
      this.listCountries(globalHealthIndices.data.countryHealthScores)
    })
  },

  methods: {
    getListOfCountries: function () {
      return axios.get('/api/countries_health_indicator_scores')
    },
    listCountries: function (countriesDetails) {
      _.each(countriesDetails, country => {
        var countryDetail = {
          countryName: country.countryName,
          overallPhase: country.countryPhase
        }
        this.countryList.push(countryDetail)
      })
    }
  }
})
