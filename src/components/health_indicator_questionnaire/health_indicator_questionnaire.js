import Vue from 'vue'
import healthIndicatorForm from './health_indicator_questionnaire.html'
import editQuestionnaire from './edit-questionaire.js'
import viewQuestionnaire from './view-questionaire.js'
import axios from 'axios'
import _ from 'lodash'
import expandCollapseHelper from './expand-collapse-helper'
import VeeValidate from 'vee-validate'

const config = {
  fieldsBagName: 'fieldBags'
}
Vue.use(VeeValidate, config)

export default Vue.extend({
  components: {
    editQuestionnaire, viewQuestionnaire
  },
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
      resources: [],
      contactName: '',
      contactDesignation: '',
      contactOrganization: '',
      contactEmail: ''
    }
    var healthIndicators = {}
    return {questionnaire: {}, countrySummary, healthIndicators, showEdit: true}
  },
  created () {
    if (this.$route.params['countryCode']) {
      this.showEdit = false
      $('.loading').show()
      this.prepareDataForViewForm(this.$route.params['countryCode'])
    } else {
      this.getQuestionnaire()
    }
  },
  methods: {
    getQuestionnaire: function () {
      axios.get('/api/health_indicator_options').then((response) => {
        this.questionnaire = response.data
        this.setUpHealthIndicators(response.data, false)
      })
    },
    setUpHealthIndicators: function (data, isExpanded) {
      data.forEach((category) => {
        category.indicators.forEach(indicator => {
          this.healthIndicators[indicator.indicatorId] = {
            categoryId: category.categoryId,
            indicatorId: indicator.indicatorId,
            score: null,
            supportingText: ''
          }
          this.$set(indicator, 'showIndicator', isExpanded)
          this.$set(indicator, 'expandCollapseBtn', expandCollapseHelper.getCaptionFor(
            isExpanded))
          $('.loading').hide()
        })
      })
    },
    fetchHealthScoresFor (countryCode) {
      return axios.get(`/api/countries/${countryCode}`)
    },
    viewFormCallback (options, scores) {
      this.questionnaire = options.data
      this.countrySummary = scores.data.countrySummary
      this.transformForView(scores.data.healthIndicators)
      $('.loading').hide()
    },
    prepareDataForViewForm (countryCode) {
      axios.all([axios.get('/api/health_indicator_options'),
        this.fetchHealthScoresFor(countryCode)])
        .then(axios.spread(this.viewFormCallback.bind(this)))
    },
    transformForView (healthindicators) {
      var self = this
      _.each(healthindicators, (indicator) => {
        self.healthIndicators[indicator.indicatorId] = {
          categoryId: indicator.categoryId,
          indicatorId: indicator.indicatorId,
          score: indicator.score,
          supportingText: indicator.supportingText
        }
      })
    }
  },
  template: healthIndicatorForm,
})
