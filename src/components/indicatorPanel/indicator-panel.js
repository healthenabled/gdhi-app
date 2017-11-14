import Vue from 'vue'
import indicatorPanel from './indicator-panel.html'
import axios from 'axios'
import httpRequests from '../../common-http/indicator-http-requests'

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
    getIndicators: function (context, countryId) {
      this.getHealthIndicators(context, countryId)
      httpRequests.getDevelopmentIndicators(context, countryId)
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
