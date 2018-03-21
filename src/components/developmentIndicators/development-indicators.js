import Vue from 'vue'
import developmentIndicatorsTemplate from './development-indicators.html'
import httpRequests from '../../common/indicator-http-requests'

export default Vue.extend({
  name: 'DevelopmentIndicators',
  data () {
    return {
      developmentIndicators: []
    }
  },
  created () {
    this.getDevelopmentIndicatorsFor(this.$route.params.countryCode)
  },
  methods: {
    getDevelopmentIndicatorsFor (countryCode) {
      $('.loading').show()
      httpRequests.getDevelopmentIndicators(this, countryCode, false)
    }
  },
  template: developmentIndicatorsTemplate,
})
