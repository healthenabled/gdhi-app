import Vue from 'vue';
// import easyAutocomplete from 'easy-autocomplete';
import axios from 'axios';
import $ from 'jquery';
import { EventBus } from '../common/event-bus';
import autoSearch from './auto-search.html';
import Autocomplete from 'vuejs-auto-complete'

export default Vue.extend({
  name: 'AutoSearch',
  components: { Autocomplete },
  mounted() {
    this.loadCountries();
  },
  data() {
    return { countries: []};
  },
  methods: {
    loadCountries() {
      axios.get('/api/countries')
        .then(response => {
          this.countries = response.data;
          // this.loadSearchData();
        });
    },
    onCountrySelect(selectedItem) {
      this.countryId = selectedItem.value;
      EventBus.$emit('Map:Searched', this.countryId);
    },
    // loadSearchData() {
    //   const options = {
    //     data: this.countries,
    //     getValue: 'name',
    //     list: {
    //       match: { enabled: true },
    //       sort: { enabled: true },
    //       onChooseEvent() {
    //         const countryId = $('#search-box').getSelectedItemData().id;
    //         EventBus.$emit('Map:Searched', countryId);
    //       },
    //     },
    //   };
    //   $('#search-box').easyAutocomplete(options);
    // },
  },
  template: autoSearch,
});
