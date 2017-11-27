import Vue from 'vue'
import editForm from './edit-questionnaire.html'
import axios from 'axios'
import autoSuggest from '../auto-search/auto-search'
import apiHelper from '../../common/country'
import VeeValidate from 'vee-validate'
import expandCollapseHelper from './expand-collapse-helper'

const config = {
  fieldsBagName: 'fieldBags'
}
Vue.use(VeeValidate, config)

export default Vue.extend({
  template: editForm,
  components: { autoSuggest },
  props: ['questionnaire', 'countrySummary', 'healthIndicators'],
  data: function () {
    return {saved: false, countryId: ''}
  },
  mounted () {
    this.loadCountries()
  },
  methods: {
    loadCountries: function () {
      apiHelper.loadCountries().then((response) => {
        this.countries = response.data
        var options = apiHelper.loadSearchData(this.countries, this.onCountrySelect.bind(this))
        $('#countryName').easyAutocomplete(options)
      })
    },
    onCountrySelect: function () {
      var countryId = $('#countryName').getSelectedItemData().id
      this.countryId = countryId
    },
    submit: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.save()
        } else {
          document.body.scrollTop = document.documentElement.scrollTop = 0
        }
      })
    },
    save: function () {
      axios.post('/api/countries', {
        countryId: this.countryId,
        countrySummary: this.countrySummary,
        healthIndicators: this.getHealthIndicators()
      }).then(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0
        this.saved = true
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
