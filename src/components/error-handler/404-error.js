import Vue from 'vue'
import errorTemplate from './error.html'

export default Vue.extend({
  template: errorTemplate,
  data () {
    return {
      errorMessage: 'Page Not Found!.'
    }
  },
  mounted () {
    $('.loading').hide()
  }
})
