import Vue from 'vue'
import editForm from './edit-questionnaire.html'
import axios from 'axios'
import autoSuggest from '../auto-search/auto-search'
import countryHelper from '../../common/country'
import VeeValidate from 'vee-validate'
import expandCollapseHelper from './expand-collapse-helper'

VeeValidate.Validator.extend('countryName', countryHelper.countryNameValidator)
const config = {
  fieldsBagName: 'fieldBags'
}
Vue.use(VeeValidate, config)

export default Vue.extend({
  template: editForm,
  components: { autoSuggest },
  props: ['questionnaire', 'countrySummary', 'healthIndicators'],
  data: function () {
    return {success: false, error: false, countryId: ''}
  },
  mounted () {
    $('.loading').show()
    this.loadCountries()
  },
  methods: {
    loadCountries: function () {
      countryHelper.loadCountries().then((response) => {
        this.countries = response.data
        var options = countryHelper.loadSearchData(this.countries, this.onCountrySelect.bind(this))
        $('#countryName').easyAutocomplete(options)
        $('.loading').hide()
      })
    },
    onCountrySelect: function () {
      var countryId = $('#countryName').getSelectedItemData().id
      this.countryId = countryId
    },
    validateCallback: function (result) {
      var isValid = result && this.validateCountryId()
      if (isValid) {
        this.save()
      } else {
        this.success = false
        this.error = true
        document.body.scrollTop = document.documentElement.scrollTop = 0
      }
    },
    submit: function () {
      this.$validator.validateAll().then(this.validateCallback.bind(this))
    },
    getSelectedCountryName: function () {
      return $('#countryName').val()
    },
    validateCountryId: function () {
      let selectedCountry = this.countries.find((country) => country.name === this.getSelectedCountryName())
      if (selectedCountry) {
        this.countryId = selectedCountry.id
        return true
      } else {
        this.countryId = ''
        return false
      }
    },
    save: function () {
      $('.loading').show()
      axios.post('/api/countries', {
        countryId: this.countryId,
        countrySummary: this.countrySummary,
        healthIndicators: this.getHealthIndicators()
      }).then(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0
        this.success = true
        this.error = false
        $('.loading').hide()
      })
    },
    getHealthIndicators: function () {
      return Object.entries(this.healthIndicators).map((entry) => entry[1])
    },
    onIndicatorExpand (indicator) {
      indicator.showIndicator = !indicator.showIndicator
      indicator.expandCollapseBtn = expandCollapseHelper.toggleCaption(
        indicator.expandCollapseBtn)
    }
  }
})
