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
        })
      })
    },
    fetchHealthScoresFor (countryCode) {
      return axios.get(`/api/countries/${countryCode}/health_indicators`)
    },
    prepareDataForViewForm (countryCode) {
      var self = this
      axios.all([axios.get('/api/health_indicator_options'),
        this.fetchHealthScoresFor(countryCode)])
        .then(axios.spread(function (options, scores) {
          self.questionnaire = options.data
          self.setUpHealthIndicators(options.data, true)
          self.applyScoresToModel(scores.data)
        }))
    },
    applyScoresToModel (scores) {
      let indicators = _.map(scores.categories, (category) => {
        return category.indicators
      })
      indicators = _.flatten(indicators)
      console.log('Indicatrs', indicators)
      var self = this
      console.log('self', self.healthIndicators)
      _.each(self.healthIndicators, row => {
        var indicatorScore = _.filter(indicators, indicator => {
          return row.indicatorId === indicator.id
        })
        row.score = indicatorScore[0] ? indicatorScore[0].score : null
        row.supportingText = indicatorScore[0] ? indicatorScore[0].supportingText : ''
      })
      console.log('Health score transformation', self.healthIndicators)
    }
  }
})
