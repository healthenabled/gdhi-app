import Vue from 'vue'
import countrySearchTemplate from './country_search_widget.html'
import easyAutocomplete from 'easy-autocomplete'
import $ from 'jquery'
import {EventBus} from '../common/event-bus'
import common from '../../common/country-search'

export default Vue.extend({
  template: countrySearchTemplate,
  name: 'countrySearchWidget',
  data: function () {
    return {show: false}
  },
  mounted () {
    EventBus.$on('showCountrySearch', () => {
      this.show = true
      this.loadCountries()
    })
  },
  methods: {
    loadCountries: function () {
      common.loadCountries()
        .then(response => {
          this.countries = response.data
          var options = common.loadSearchData(this.countries, this.onChooseEvent.bind(this))
          $('#search-box').easyAutocomplete(options)
        })
      console.log(easyAutocomplete)
    },
    onChooseEvent: function () {
      var countryId = $('#search-box').getSelectedItemData().id
      console.log('Selected Country ID:' + countryId)
      EventBus.$emit('Map:Searched', countryId)
    }
  }
})
