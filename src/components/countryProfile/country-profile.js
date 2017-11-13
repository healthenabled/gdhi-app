import Vue from 'vue'
import countryProfile from './countryProfile.html'
import axios from 'axios'
import _ from 'lodash'

export default Vue.extend({
  data () {
    return {healthIndicatorData: {}}
  },
  template: countryProfile,
  created () {
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
          this.hideAllIndicators()
        })
    },
    onCategoryExpand (category, index) {
      category.showIndicator = !category.showIndicator
    },
    hideAllIndicators () {
      _.each(this.healthIndicatorData.categories, (category) => {
        this.$set(category, 'showIndicator', false)
      })
    }
  }
})
