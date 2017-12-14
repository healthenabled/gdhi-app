import Vue from 'vue'
import countryList from './country-list.html'
import axios from 'axios'
import _ from 'lodash'

export default Vue.extend({
  template: countryList,
  name: 'country-list',

  data () {
    return {
      countryList: [],
      globalHealthIndicators: []
    }
  },

  mounted () {
    $('.loading').show()
    this.getListOfCountries().then(this.countryListCallback.bind(this))
  },

  methods: {
    countryListCallback: function (globalHealthIndices) {
      this.globalHealthIndicators = globalHealthIndices.data.countryHealthScores
      this.listCountries(globalHealthIndices.data.countryHealthScores)
    },
    getListOfCountries: function () {
      var windowProperties = window.appProperties
      return axios.get('/api/countries_health_indicator_scores?categoryId=' + windowProperties.getCategoryFilter() + '&phase=' + windowProperties.getPhaseFilter())
    },
    listCountries: function (countriesDetails) {
      _.each(countriesDetails, country => {
        var countryDetail = {
          countryName: country.countryName,
          overallPhase: country.countryPhase,
          countryId: country.countryId
        }
        this.countryList.push(countryDetail)
        $('.loading').hide()
      })
    },
    showCountryDetails: function (countryId) {
      this.$router.push({path: `/countryProfile/${countryId}`})
    }
  }
})
