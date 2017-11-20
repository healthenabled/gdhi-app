import Vue from 'vue'
import healthIndicatorForm from './health_indicator_questionnaire.html'
import axios from 'axios'

export default Vue.extend({
  template: healthIndicatorForm,
  data: function () {
    var countrySummary = {
      dataFeederName: '',
      dataFeederRole: '',
      dataFeederEmail: '',
      dataCollectorName: '',
      dataCollectorRole: '',
      dataCollectorEmail: '',
      collectedDate: '',
      summary: '',
      resources: '',
      contactName: '',
      contactDesignation: '',
      contactOrganization: '',
      contactEmail: ''
    }
    var healthIndicators = {}
    return {countryId: 'IND', questionnaire: {}, countrySummary, healthIndicators}
  },
  mounted: function () {
    this.getQuestionnaire()
  },
  methods: {
    getQuestionnaire: function () {
      axios.get('/api/health_indicator_options').then((response) => {
        this.questionnaire = response.data
        this.setUpHealthIndicators(response.data)
      })
    },
    setUpHealthIndicators: function (data) {
      data.forEach((category) => {
        category.indicators.forEach(indicator => {
          this.healthIndicators[indicator.indicatorId] = {categoryId: category.categoryId,
            indicatorId: indicator.indicatorId,
            score: '',
            supportingText: ''}
          this.$set(indicator, 'showIndicator', false)
          this.$set(indicator, 'expandCollapseBtn', '+')
        })
      })
    },
    submit: function () {
      axios.post('/api/countries', {
        countryId: this.countryId,
        countrySummary: this.countrySummary,
        healthIndicators: this.getHealthIndicators()
      }).then(() => {
        console.log('Details saved successfully')
      })
    },
    getHealthIndicators: function () {
      return Object.entries(this.healthIndicators).map((entry) => entry[1])
    },
    onIndicatorExpand (indicator) {
      indicator.showIndicator = !indicator.showIndicator
      indicator.expandCollapseBtn = indicator.expandCollapseBtn === '+' ? '-' : '+'
    }
  }
})
