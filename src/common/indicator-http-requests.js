import axios from 'axios'

export default ({

  getGNIPerCapitaInKilo: function (gniPerCapita) {
    return gniPerCapita ? gniPerCapita / 1000 + 'K' : 'NA'
  },

  getTotalPopulationInMillion: function (population) {
    var populationInMillion = population ? Number((population / 10000000).toFixed(2)) : null
    return populationInMillion ? populationInMillion + 'M' : 'NA'
  },

  getHealthExpenditureInPercentage: function (healthExpenditure) {
    return healthExpenditure ? Number((healthExpenditure).toFixed(1)) + '%' : 'NA'
  },

  getAdultLiteracyInPercentage: function (adultLiteracy) {
    return adultLiteracy ? Number((adultLiteracy).toFixed(1)) + '%' : 'NA'
  },
  getNCDDeathsInPercentage: function (ncdDeaths) {
    return ncdDeaths ? Number((ncdDeaths).toFixed(1)) + '%' : 'NA'
  },
  getLifeExpectancy: function (lifeExpectancy) {
    return lifeExpectancy === null ? 'NA' : lifeExpectancy
  },
  getUnder5Mortality: function (under5Mortality) {
    return under5Mortality === null ? 'NA' : under5Mortality
  },
  getDoingBusinessIndex: function (doingBusinessIndex) {
    return doingBusinessIndex === null ? 'NA' : doingBusinessIndex
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
          'Life expectancy at birth (years)': self.getLifeExpectancy(response.data.lifeExpectancy),
          'Health expenditure (% of GDP)': self.getHealthExpenditureInPercentage(response.data.healthExpenditure)
        }
      }
    ]
    return developmentIndicatorsData
  },

  getDevelopmentIndicatorsData: function (self, response) {
    var developmentIndicatorsData = [
      {
        'CONTEXT': {
          'GNI per capita, atlas method (current US$)': self.getGNIPerCapitaInKilo(response.data.gniPerCapita),
          'Total population': self.getTotalPopulationInMillion(response.data.totalPopulation),
          'Adult literacy rate, population 15+ years, both sexes (%)':
            self.getAdultLiteracyInPercentage(response.data.adultLiteracy),
          'Ease of doing business index': self.getDoingBusinessIndex(response.data.doingBusinessIndex)
        }
      },
      {
        'HEALTH': {
          'Life expectancy at birth (years)': self.getLifeExpectancy(response.data.lifeExpectancy),
          'Health expenditure (% of GDP)': self.getHealthExpenditureInPercentage(response.data.healthExpenditure),
          'Cause of death, by non-communicable diseases (% of total)':
            self.getNCDDeathsInPercentage(response.data.totalNcdDeathsPerCapita),
          'Mortality rate, under-5 (per 1,000 live births)': self.getUnder5Mortality(response.data.under5Mortality)
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
        $('.loading').hide()
      }).catch(e => {
        $('.loading').hide()
        console.log('Error pulling development indicators data')
      })
  }
})
