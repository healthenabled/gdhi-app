import Vue from 'vue'
import countryProfile from './countryProfile.html'
import developmentIndicators from '../developmentIndicators/development-indicators.js'
import countrySummary from '../countrySummary/country-summary.js'
import exportData from '../exportData/export-data.js'
import axios from 'axios'
import _ from 'lodash'

export default Vue.extend({
  data () {
    return {
      healthIndicatorData: [{countryName: '', countryPhase: 'NA', categories: []}],
      url: ''
    }
  },
  template: countryProfile,

  components: { developmentIndicators, countrySummary, exportData },

  created () {
    this.getHealthIndicatorsFor(this.$route.params.countryCode)
    this.url = '/api/export_country_data/' + this.$route.params.countryCode
  },
  methods: {
    getHealthIndicatorsFor (countryCode) {
      axios.get(`/api/countries/${countryCode}/health_indicators`)
        .then(response => {
          this.healthIndicatorData.pop()
          this.healthIndicatorData.push(response.data)
          this.initialise()
        })
    },
    onCategoryExpand (category, index) {
      category.showIndicator = !category.showIndicator
      category.expandCollapseBtn = category.expandCollapseBtn === '+' ? '-' : '+'
    },
    initialise () {
      _.each(this.healthIndicatorData[0].categories, (category) => {
        this.$set(category, 'showIndicator', false)
        this.$set(category, 'expandCollapseBtn', '+')
      })
    }
  }
})
