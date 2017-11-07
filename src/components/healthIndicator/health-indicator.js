import Vue from 'vue'
import healthIndicator from './health-indicator.html'
import axios from 'axios'

export default Vue.extend({
  template: healthIndicator,
  name: 'health-indicator-panel',

  data () {
    return {
      developmentIndicators: [],
      healthIndicators: {}
    }
  },

  created () {
    var self = this
    const countryId = 'ARG'
    this.getHealthIndicators(self, countryId)
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
        var developmentIndicatorsData = [
          {'CONTEXT': {
            'gni Per Capita': context.getGNIPerCapitaInKilo(response.data.gniPerCapita),
            'total population': context.getTotalPopulationInMillion(response.data.totalPopulation)
          }},
          {'HEALTH': {
            'life expectancy': response.data.lifeExpectancy,
            'health expenditure': context.getHealthExpenditureInPercentage(response.data.healthExpenditure)
          }}
        ]
        this.developmentIndicators = developmentIndicatorsData
      }).catch(e => {
        console.log('Error pulling development indicators data')
      })
    },

    getHealthIndicators: function (context, countryId) {
      const healthIndicatorsUrl = '/api/countries/' + countryId + '/health_indicators'
      axios.get(healthIndicatorsUrl)
      .then(response => {
        var healthIndicatorsData = {
          'countryName': response.data.countryName,
          'overallScore': response.data.overallScore,
          'categories': response.data.categories,
          'countryPhase': response.data.countryPhase
        }
        this.healthIndicators = healthIndicatorsData
      }).catch(e => {
        console.log('Error pulling health indicators data')
      })
    }
  }
})
