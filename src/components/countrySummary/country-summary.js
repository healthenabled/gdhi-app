import Vue from 'vue'
import countrySummary from './country-summary.html'
import thumbnailMap from './thumbnail-map'
import axios from 'axios'

export default Vue.extend({
  template: countrySummary,
  name: 'country-summary',
  components: {thumbnailMap},
  data () {
    return {
      countrySummaries: {}
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
        }).catch(e => {
          console.log('Error pulling development indicators data')
        })
    }
  }
})
