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
    $('.loading').show()
    this.getCountrySummary(this.$route.params.countryCode)
  },
  methods: {
    getCountrySummary (countryCode) {
      const countrySummaryUrl = '/api/countries/' + countryCode + '/country_summary'
      axios.get(countrySummaryUrl)
        .then((response) => this.countryListCallback(response, countryCode))
        .catch(e => {
          console.log('Error pulling development indicators data')
        })
    },
    countrySummaryCallback (response, countryCode) {
      this.countrySummaries = response.data
      this.countryName = (this.countrySummaries.countryName) ? this.countrySummaries.countryName : countryCode
      $('.loading').hide()
    }
  }
})
