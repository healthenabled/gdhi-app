import Vue from 'vue'
import countrySummary from './country-summary.html'
import axios from 'axios'

export default Vue.extend({
  template: countrySummary,
  name: 'country-summary',
  data () {
    return {
      countrySummaries: {},
      mapEnv: process.env.MAP_KEY,
      countryName: ''
    }
  },
  created () {
    this.getCountrySummary(this.$route.params.countryCode)
  },
  methods: {
    getCountrySummary (countryCode) {
      const countrySummaryUrl = '/api/countries/' + countryCode + '/country_summary'
      var self = this
      axios.get(countrySummaryUrl)
        .then(response => {
          self.countrySummaries = response.data
          self.countryName = (self.countrySummaries.countryName) ? self.countrySummaries.countryName : countryCode
        }).catch(e => {
          console.log('Error pulling development indicators data')
        })
    }
  }
})
