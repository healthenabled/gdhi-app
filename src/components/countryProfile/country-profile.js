import Vue from 'vue'
import countryProfile from './countryProfile.html'

export default Vue.extend({
  template: countryProfile,
  created () {
    console.log('IN country profile route')
  },
  mounted () {
    console.log('IN country profile route')
  }
})
