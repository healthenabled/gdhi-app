import Vue from 'vue'
import healthIndicatorForm from './health_indicator_questionnaire.html'
import axios from 'axios'

export default Vue.extend({
  template: healthIndicatorForm,
  data: function () {
    var contactSummary = {
      countryId: '',
      feeder_name: '',
      feeder_role: '',
      feeder_email: '',
      collector_name: '',
      collector_role: '',
      collector_email: '',
      collected_date: '',
      country_summary: '',
      resources: [],
      contact_name: '',
      contact_designation: '',
      contact_org: '',
      contact_email: ''
    }
    var healthIndicators = []
    return {questionnaire: {}, contactSummary, healthIndicators}
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
        })
      })
    },
    submit: function () {
      console.log(this.contactSummary)
      console.log(this.healthIndicators)
    }
  }
})
