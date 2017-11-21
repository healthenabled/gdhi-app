import Vue from 'vue'
import header from './header.html'

export default Vue.extend({
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
