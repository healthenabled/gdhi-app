import Vue from 'vue'
import countryProfile from './countryProfile.html'
import axios from 'axios'

export default Vue.extend({
  data () {
    return {healthIndicatorData: {}}
  },
  template: countryProfile,
  created () {
    // this.countryCode = this.$route.params.countryCode
    this.getHealthIndicatorsFor(this.$route.params.countryCode)
  },
  mounted () {
    console.log('IN country profile route')
  },
  methods: {
    getHealthIndicatorsFor (countryCode) {
      axios.get(`/api/countries/${countryCode}/health_indicators`)
        .then(response => {
          this.healthIndicatorData = response.data
        })
    }
  }
})
