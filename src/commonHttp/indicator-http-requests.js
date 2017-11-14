import axios from 'axios'

export default ({

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

  getMinimalDevelopmentIndicatorsData: function (self, response) {
    var developmentIndicatorsData = [
      {
        'CONTEXT': {
          'gni Per Capita': self.getGNIPerCapitaInKilo(response.data.gniPerCapita),
          'total population': self.getTotalPopulationInMillion(response.data.totalPopulation)
        }
      },
      {
        'HEALTH': {
          'life expectancy': response.data.lifeExpectancy,
          'health expenditure': self.getHealthExpenditureInPercentage(response.data.healthExpenditure)
        }
      }
    ]
    return developmentIndicatorsData
  },

  getDevelopmentIndicators: function (context, countryId) {
    const developmentIndicatorsUrl = '/api/countries/' + countryId + '/development_indicators'
    var self = this
    axios.get(developmentIndicatorsUrl)
      .then(response => {
        context.developmentIndicators = self.getMinimalDevelopmentIndicatorsData(self, response)
      }).catch(e => {
        console.log('Error pulling development indicators data')
      })
  }
})
