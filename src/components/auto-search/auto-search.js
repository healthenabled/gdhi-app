import Vue from 'vue';
import axios from 'axios';
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
        });
    },
    onCountrySelect(selectedItem) {
      this.countryId = selectedItem.value;
      EventBus.$emit('Map:Searched', this.countryId);
    },
  },
  template: autoSearch,
});
