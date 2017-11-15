import Vue from 'vue'
import countryProfile from './countryProfile.html'
import developmentIndicators from '../developmentIndicators/development-indicators.js'
import countrySummary from '../countrySummary/country-summary.js'
import axios from 'axios'
import _ from 'lodash'

export default Vue.extend({
  data () {
    return {healthIndicatorData: {}}
  },
  template: countryProfile,

  components: { developmentIndicators, countrySummary },

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
          this.initialise()
        })
    },
    onCategoryExpand (category, index) {
      category.showIndicator = !category.showIndicator
      category.expandCollapseBtn = category.expandCollapseBtn === '+' ? '-' : '+'
    },
    initialise () {
      _.each(this.healthIndicatorData.categories, (category) => {
        this.$set(category, 'showIndicator', false)
        this.$set(category, 'expandCollapseBtn', '+')
      })
    }
  }
})
