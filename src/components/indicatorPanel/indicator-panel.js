import Vue from 'vue'
import indicatorPanel from './indicator-panel.html'
import axios from 'axios'
import httpRequests from '../../common/indicator-http-requests'

export default Vue.extend({
  template: indicatorPanel,
  name: 'indicator-panel',

  data () {
    return {
      developmentIndicators: [],
      healthIndicators: {},
      globalHealthIndicators: {},
      showCountryDetail: true,
      country: {},
      categoryFilter: window.appProperties.getCategoryFilter(),
      indicatorPanelTitle: this.getIndicatorContainerName(),
      phaseTitle: '',
      isListOfCategoriesApplicable: this.areCategoriesApplicable(),
      isNoGlobalHealthIndicators: false
    }
  },

  mounted () {
    $('.loading').show()
    this.getGlobalHealthIndicators()
    this.$parent.$on('Map:Clicked', ($clickedEl) => {
      if ($clickedEl.type === 'COUNTRY') {
        this.country.countryName = $clickedEl.countryName
        this.country.countryCode = $clickedEl.countryCode
        console.log('Listening', this.country.countryCode)
        this.getIndicators(this, this.country.countryCode)
      } else if ($clickedEl.type === 'GLOBAL') {
        this.getGlobalHealthIndicators()
      }
    })
    this.$parent.$on('filtered', () => {
      this.getGlobalHealthIndicators()
    })
  },

  methods: {

    setIndicatorTitleAndCategoryApplicability: function () {
      this.indicatorPanelTitle = this.getIndicatorContainerName()
      this.phaseTitle = this.getPhaseTitle()
      this.isListOfCategoriesApplicable = this.areCategoriesApplicable()
      this.isNoGlobalHealthIndicators = this.isNoGlobalHealthIndicatorsPresent()
    },

    areCategoriesApplicable: function () {
      return this.categoryFilter || this.isNoFilterPresent()
    },

    isNoFilterPresent: function () {
      return !this.categoryFilter && !this.phaseFilter
    },

    getIndicatorContainerName: function () {
      var indicatorPanelTitle = ''
      if (this.categoryFilter) {
        indicatorPanelTitle = this.getCategoryAsTitle()
      } else {
        indicatorPanelTitle = this.phaseFilter ? 'Overall' : 'State of Digital Health around the world today'
      }
      return indicatorPanelTitle
    },

    getCategoryAsTitle: function () {
      var category = this.globalHealthIndicators.categories[0]
      return category ? category.name : 'No countries available for the selected criteria'
    },

    isNoGlobalHealthIndicatorsPresent: function () {
      return this.globalHealthIndicators.categories.length === 0
    },

    getPhaseTitle: function () {
      var phaseTitle = this.phaseFilter ? 'Phase '.concat(this.phaseFilter) : 'Global Average'
      return this.isNoGlobalHealthIndicatorsPresent() || this.isNoFilterPresent() ? '' : phaseTitle
    },

    getIndicators: function (context, countryId) {
      this.getHealthIndicators(context, countryId)
      httpRequests.getDevelopmentIndicators(context, countryId, true)
    },

    getHealthIndicators: function (context, countryId) {
      const healthIndicatorsUrl = '/api/countries/' + countryId + '/health_indicators'
      axios.get(healthIndicatorsUrl)
      .then(this.getHealthIndicatorCallback.bind(this)).catch(e => {
        console.log('Error pulling health indicators data')
      })
    },
    getHealthIndicatorCallback: function (response) {
      var healthIndicatorsData = {
        'countryId': response.data.countryId,
        'countryName': response.data.countryName,
        'overallScore': response.data.overallScore,
        'categories': response.data.categories,
        'countryPhase': response.data.countryPhase
      }
      this.healthIndicators = healthIndicatorsData
      this.showCountryDetail = true
      this.country.countryName = this.country.countryName ? this.country.countryName : healthIndicatorsData.countryName
    },

    getGlobalHealthIndicators: function () {
      var windowProperties = window.appProperties
      const globalHealthIndicatorsUrl = '/api/global_health_indicators?categoryId=' + windowProperties.getCategoryFilter() + '&phase=' + windowProperties.getPhaseFilter()
      axios.get(globalHealthIndicatorsUrl)
      .then(this.getGlobalHealthIndicatorCallback.bind(this)).catch(e => {
        $('.loading').hide()
        console.log('Error pulling health indicators data')
      })
    },
    getGlobalHealthIndicatorCallback: function (response) {
      var globalHealthIndicatorsData = {
        'overallCountryScore': response.data.overAllScore,
        'categories': response.data.categories
      }
      this.globalHealthIndicators = globalHealthIndicatorsData
      this.categoryFilter = window.appProperties.getCategoryFilter()
      this.phaseFilter = window.appProperties.getPhaseFilter()
      this.setIndicatorTitleAndCategoryApplicability()
      this.showCountryDetail = false
      $('.loading').hide()
    },

    showCountryDetails: function (countryId) {
      this.$router.push({path: `/countryProfile/${countryId}`})
    },

    showListOfCountries: function () {
      this.$router.push({path: `/country_list`})
    }
  }
})
