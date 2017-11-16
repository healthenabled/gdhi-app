import Vue from 'vue'
import indicatorPanel from './indicator-panel.html'
import axios from 'axios'
import httpRequests from '../../commonHttp/indicator-http-requests'

export default Vue.extend({
  template: indicatorPanel,
  name: 'indicator-panel',

  data () {
    return {
      developmentIndicators: [],
      healthIndicators: {},
      globalHealthIndicators: {},
      showCountryDetail: true,
      country: {}
    }
  },

  mounted () {
    this.getGlobalHealthIndicators()
    this.$parent.$on('countrySelectionChanged', (country) => {
      this.country = country
      console.log('Listening', country.countryCode)
      this.getIndicators(this, country.countryCode)
    })
  },

  methods: {
    getIndicators: function (context, countryId) {
      this.getHealthIndicators(context, countryId)
      httpRequests.getDevelopmentIndicators(context, countryId, true)
    },

    getHealthIndicators: function (context, countryId) {
      const healthIndicatorsUrl = '/api/countries/' + countryId + '/health_indicators'
      axios.get(healthIndicatorsUrl)
      .then(response => {
        var healthIndicatorsData = {
          'countryId': response.data.countryId,
          'countryName': response.data.countryName,
          'overallScore': response.data.overallScore,
          'categories': response.data.categories,
          'countryPhase': response.data.countryPhase
        }
        this.healthIndicators = healthIndicatorsData
        this.showCountryDetail = true
      }).catch(e => {
        console.log('Error pulling health indicators data')
      })
    },

    getGlobalHealthIndicators: function () {
      const globalHealthIndicatorsUrl = '/api/global_health_indicators'
      axios.get(globalHealthIndicatorsUrl)
      .then(response => {
        var globalHealthIndicatorsData = {
          'overallCountryScore': response.data.overAllScore,
          'categories': response.data.categories
        }
        this.globalHealthIndicators = globalHealthIndicatorsData
        this.showCountryDetail = false
      }).catch(e => {
        console.log('Error pulling health indicators data')
      })
    },

    showCountryDetails: function (countryId) {
      this.$router.push({path: `/countryProfile/${countryId}`})
    }
  }
})
