import Vue from 'vue'
import countryDetail from './country-detail.html'
import axios from 'axios'

export default Vue.extend({
  template: countryDetail,
  name: 'country-detail-panel',

  data () {
    this.developmentIndicators = {
      details: {}
    }
    return this.developmentIndicators
  },

  created () {
    var self = this
    const countryId = 'ARG'
    const developmentIndicatorsUrl = '/api/countries/' + countryId + '/development_indicators'
    axios.get(developmentIndicatorsUrl)
    .then(response => {
      var developmentIndicatorsData = response.data
      self.$set(this.developmentIndicators, 'details', {
        'gniPerCapita': self.getGNIPerCapitaInKilo(developmentIndicatorsData.gniPerCapita),
        'population': self.getTotalPopulationInMillion(developmentIndicatorsData.totalPopulation),
        'lifeExpectancy': developmentIndicatorsData.lifeExpectancy,
        'healthExpenditure': self.getHealthExpenditureInPercentage(developmentIndicatorsData.healthExpenditure)
      })
    })
    .catch(e => {
      console.log('Error pulling development indicators data')
    })
  },

  methods: {
    getGNIPerCapitaInKilo: function (gniPerCapita) {
      return gniPerCapita / 1000 + 'K'
    },

    getTotalPopulationInMillion: function (population) {
      var populationInMillion = Number((population / 10000000).toFixed(2))
      return populationInMillion + 'M'
    },

    getHealthExpenditureInPercentage: function (healthExpenditure) {
      return Number((healthExpenditure).toFixed(1)) + '%'
    }

  }

})
