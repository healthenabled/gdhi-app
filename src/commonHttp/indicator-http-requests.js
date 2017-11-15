import axios from 'axios'

export default ({

  getGNIPerCapitaInKilo: function (gniPerCapita) {
    return gniPerCapita ? gniPerCapita / 1000 + 'K' : null
  },

  getTotalPopulationInMillion: function (population) {
    var populationInMillion = population ? Number((population / 10000000).toFixed(2)) : null
    return populationInMillion ? populationInMillion + 'M' : null
  },

  getHealthExpenditureInPercentage: function (healthExpenditure) {
    return healthExpenditure ? Number((healthExpenditure).toFixed(1)) + '%' : null
  },

  getAdultLiteracyInPercentage: function (adultLiteracy) {
    return adultLiteracy ? Number((adultLiteracy).toFixed(1)) + '%' : null
  },
  getNCDDeathsInPercentage: function (ncdDeaths) {
    return ncdDeaths ? Number((ncdDeaths).toFixed(1)) + '%' : null
  },
  getMinimalDevelopmentIndicatorsData: function (self, response) {
    var developmentIndicatorsData = [
      {
        'CONTEXT': {
          'GNI per capita, atlas method (current US$)': self.getGNIPerCapitaInKilo(response.data.gniPerCapita),
          'Total population': self.getTotalPopulationInMillion(response.data.totalPopulation)
        }
      },
      {
        'HEALTH': {
          'Life expectancy at birth (years)': response.data.lifeExpectancy,
          'Health expenditure (% of GDP)': self.getHealthExpenditureInPercentage(response.data.healthExpenditure)
        }
      }
    ]
    return developmentIndicatorsData
  },

  getDevelopmentIndicatorsData: function (self, response) {
    debugger
    var developmentIndicatorsData = [
      {
        'CONTEXT': {
          'GNI per capita, atlas method (current US$)': self.getGNIPerCapitaInKilo(response.data.gniPerCapita),
          'Total population': self.getTotalPopulationInMillion(response.data.totalPopulation),
          'Adult literacy rate, population 15+ years, both sexes (%)':
            self.getAdultLiteracyInPercentage(response.data.adultLiteracy),
          'Ease of doing business index': response.data.doingBusinessIndex
        }
      },
      {
        'HEALTH': {
          'Life expectancy at birth (years)': response.data.lifeExpectancy,
          'Health expenditure (% of GDP)': self.getHealthExpenditureInPercentage(response.data.healthExpenditure),
          'Cause of death, by non-communicable diseases (% of total)':
            self.getNCDDeathsInPercentage(response.data.totalNcdDeathsPerCapita),
          'Mortality rate, under-5 (per 1,000 live births)': response.data.under5Mortality
        }
      }
    ]
    return developmentIndicatorsData
  },

  getDevelopmentIndicators: function (context, countryId, isMinimal) {
    const developmentIndicatorsUrl = '/api/countries/' + countryId + '/development_indicators'
    var self = this
    axios.get(developmentIndicatorsUrl)
      .then(response => {
        context.developmentIndicators = isMinimal ? self.getMinimalDevelopmentIndicatorsData(self, response)
                                                  : self.getDevelopmentIndicatorsData(self, response)
      }).catch(e => {
        console.log('Error pulling development indicators data')
      })
  }
})
