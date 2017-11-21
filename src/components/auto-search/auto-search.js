import Vue from 'vue'
import autoSearch from './auto-search.html'
import easyAutocomplete from 'easy-autocomplete'
import axios from 'axios'
import $ from 'jquery'
import {EventBus} from '../common/event-bus'

export default Vue.extend({
  template: autoSearch,
  name: 'auto-search',
  mounted () {
    this.loadCountries()
  },
  methods: {
    loadCountries: function () {
      axios.get('/api/countries')
        .then(response => {
          this.countries = response.data
          this.loadSearchData()
        })
      console.log(easyAutocomplete)
    },
    loadSearchData: function () {
      var options = {
        data: this.countries,
        getValue: 'name',
        list: {
          match: {enabled: true},
          sort: {enabled: true},
          onChooseEvent: function () {
            var countryId = $('#search-box').getSelectedItemData().id
            console.log('Selected Country ID:' + countryId)
            EventBus.$emit('Map:Searched', countryId)
          }
        }
      }
      $('#search-box').easyAutocomplete(options)
    }
  }
})
