import Vue from 'vue'
import healthIndicatorForm from './health_indicator_questionnaire.html'
import axios from 'axios'
import countrySearch from '../auto-search/auto-search'

export default Vue.extend({
  components: {
    countrySearch
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
    this.loadCountries()
  },
  methods: {
    loadCountries: function () {
      common.loadCountries().then((response) => {
        this.countries = response.data
        var options = common.loadSearchData(this.countries, this.onCountrySelect.bind(this))
        $('#countryName').easyAutocomplete(options)
      })
    },
    onCountrySelect: function () {
      var countryId = $('#countryName').getSelectedItemData().id
      this.countryId = countryId
    },
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
