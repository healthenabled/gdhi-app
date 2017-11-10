import Vue from 'vue'
import indicatorPanel from './indicator-panel.html'
import axios from 'axios'

export default Vue.extend({
  template: indicatorPanel,
  name: 'indicator-panel',

  data () {
    return {
      developmentIndicators: [],
      healthIndicators: {}
    }
  },

  created () {
    var self = this
    // Todo: Remove countryName & countryId variables on wiring up Global summary
    const countryId = 'ARG'
    this.getIndicators(self, countryId)
    this.countryName = 'ARGENTINA'
  },
  mounted () {
    this.$parent.$on('countrySelectionChanged', (country) => {
      console.log('Listening', country.countryCode)
      this.getIndicators(this, country.countryCode)
      this.countryName = country.name
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
    },

    getIndicators: function (context, countryId) {
      this.getHealthIndicators(context, countryId)
      this.getDevelopmentIndicators(context, countryId)
    },

    getDevelopmentIndicators: function (context, countryId) {
      const developmentIndicatorsUrl = '/api/countries/' + countryId + '/development_indicators'
      var self = this
      axios.get(developmentIndicatorsUrl)
      .then(response => {
        var developmentIndicatorsData = [
          {'CONTEXT': {
            'gni Per Capita': self.getGNIPerCapitaInKilo(response.data.gniPerCapita),
            'total population': self.getTotalPopulationInMillion(response.data.totalPopulation)
          }},
          {'HEALTH': {
            'life expectancy': response.data.lifeExpectancy,
            'health expenditure': self.getHealthExpenditureInPercentage(response.data.healthExpenditure)
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
