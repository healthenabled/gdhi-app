import axios from 'axios';
import common from './common'

export default ({

  getGNIPerCapitaInKilo(gniPerCapita) {
    return gniPerCapita ? `${gniPerCapita / 1000}K` : 'NA';
  },

  getTotalPopulationInMillion(population) {
    const populationInMillion = population ? Number((population / 1000000).toFixed(2)) : null;
    return populationInMillion ? `${populationInMillion}M` : 'NA';
  },

  getInPercenatge (value) {
    return value ? `${Number((value).toFixed(1))}%` : 'NA';
  },

  getValue (value) {
    return  !value ? 'NA' : value;
  },
  
  getMinimalDevelopmentIndicatorsData(response) {
    let self = this;
    const developmentIndicatorsData = [
      {
        CONTEXT: {
          'GNI per capita, atlas method (current US$)': self.getGNIPerCapitaInKilo(response.gniPerCapita),
          'Total population': self.getTotalPopulationInMillion(response.totalPopulation),
        },
      },
      {
        HEALTH: {
          'Life expectancy at birth (years)': self.getValue(response.lifeExpectancy),
          'Health expenditure (% of GDP)': self.getInPercenatge(response.healthExpenditure),
        },
      },
    ];
    return developmentIndicatorsData;
  },

  getDevelopmentIndicatorsData(response) {
    var self = this;
    const developmentIndicatorsData = [
      {
        CONTEXT: {
          'GNI per capita, atlas method (current US$)': self.getGNIPerCapitaInKilo(response.gniPerCapita),
          'Total population': self.getTotalPopulationInMillion(response.totalPopulation),
          'Adult literacy rate, population 15+ years, both sexes (%)':
            this.getInPercenatge(response.adultLiteracy),
          'Ease of doing business index': self.getValue(response.doingBusinessIndex),
        },
      },
      {
        HEALTH: {
          'Life expectancy at birth (years)': self.getValue(response.lifeExpectancy),
          'Health expenditure (% of GDP)': self.getInPercenatge(response.healthExpenditure),
          'Cause of death, by non-communicable diseases (% of total)':
            self.getInPercenatge(response.totalNcdDeathsPerCapita),
          'Mortality rate, under-5 (per 1,000 live births)': self.getValue(response.under5Mortality),
        },
      },
    ];
    return developmentIndicatorsData;
  },

  getDevelopmentIndicators(countryId, isMinimal) {
    const developmentIndicatorsUrl = `/api/countries/${countryId}/development_indicators`;
    const self = this;
    return (axios.get(developmentIndicatorsUrl)
      .then(response => {
        return (isMinimal ? self.getMinimalDevelopmentIndicatorsData(response.data)
          : self.getDevelopmentIndicatorsData(response.data));
      }).catch((e) => {
        return e;
      }));
  },
});
