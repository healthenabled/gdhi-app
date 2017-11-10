import Vue from 'vue'
import header from './header.html'
import $ from 'jquery'
import easyAutocomplete from 'easy-autocomplete'
import axios from 'axios'
import { EventBus } from '../common/event-bus'

export default Vue.extend({
  template: header,
  name: 'Header',

  data () {
    return {
      countries: {},
      developmentIndicators: [],
      healthIndicators: {}
    }
  },
  mounted () {
    var self = this
    this.loadCountries(self)
    console.log(easyAutocomplete)
  },
  methods: {
    loadCountries: function (context) {
      axios.get('/api/countries').then(response => { this.countries = response.data; this.loadSearchData(context, this.countries) })
    },

    loadSearchData: function (context, countries) {
      var options = {
        data: countries,
        getValue: 'name',
        list: {
          match: { enabled: true },
          onChooseEvent: function () {
            var countryId = $('#search-box').getSelectedItemData().id
            console.log('Selected Country ID:' + countryId)
            EventBus.$emit('countrySearched', countryId)
          }
        }
      }
      $('#search-box').easyAutocomplete(options)
    }
  }
})
