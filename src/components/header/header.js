import Vue from 'vue'
import header from './header.html'
import countrySearch from '../country-search/country_search'

export default Vue.extend({
  components: {
    countrySearch
  },
  template: header,
  name: 'Header',

  data () {
    return {
      countries: {},
      developmentIndicators: [],
      healthIndicators: {}
    }
  }
})
