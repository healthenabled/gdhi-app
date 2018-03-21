import Vue from 'vue';
import easyAutocomplete from 'easy-autocomplete';
import axios from 'axios';
import $ from 'jquery';
import { EventBus } from '../common/event-bus';
import autoSearch from './auto-search.html';

export default Vue.extend({
  name: 'AutoSearch',
  mounted() {
    this.loadCountries();
  },
  methods: {
    loadCountries() {
      axios.get('/api/countries')
        .then(response => {
          this.countries = response.data;
          this.loadSearchData();
        });
    },
    loadSearchData() {
      const options = {
        data: this.countries,
        getValue: 'name',
        list: {
          match: { enabled: true },
          sort: { enabled: true },
          onChooseEvent() {
            const countryId = $('#search-box').getSelectedItemData().id;
            EventBus.$emit('Map:Searched', countryId);
          },
        },
      };
      $('#search-box').easyAutocomplete(options);
    },
  },
  template: autoSearch,
});
