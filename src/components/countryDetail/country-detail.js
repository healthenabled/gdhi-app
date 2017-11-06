import Vue from 'vue'
import countryDetail from './country-detail.html'
import axios from 'axios'

export default Vue.extend({
  template: countryDetail,
  name: 'country-detail-panel',

  data () {
    return {
      developmentIndicators: {}
    }
  },

  created () {
    var self = this
    const countryId = 'ARG'
    this.getDevelopmentIndicators(self, countryId)
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
    },

    getDevelopmentIndicators: function (context, countryId) {
      const developmentIndicatorsUrl = '/api/countries/' + countryId + '/development_indicators'
      axios.get(developmentIndicatorsUrl)
      .then(response => {
        var developmentIndicatorsData = {
          'gniPerCapita': context.getGNIPerCapitaInKilo(response.data.gniPerCapita),
          'population': context.getTotalPopulationInMillion(response.data.totalPopulation),
          'lifeExpectancy': response.data.lifeExpectancy,
          'healthExpenditure': context.getHealthExpenditureInPercentage(response.data.healthExpenditure)
        }
        this.developmentIndicators = developmentIndicatorsData
      }).catch(e => {
        console.log('Error pulling development indicators data')
      })
    }
  }

})
