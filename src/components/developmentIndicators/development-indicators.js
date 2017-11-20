import Vue from 'vue'
import developmentIndicatorsTemplate from './development-indicators.html'
import httpRequests from '../../common/indicator-http-requests'

export default Vue.extend({
  template: developmentIndicatorsTemplate,
  name: 'development-indicators',
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
      httpRequests.getDevelopmentIndicators(this, countryCode, false)
    }
  }
})
