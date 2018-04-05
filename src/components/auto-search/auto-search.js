import Vue from 'vue';
import axios from 'axios';
import { EventBus } from '../common/event-bus';
import autoSearch from './auto-search.html';
import Autocomplete from 'vuejs-auto-complete'
import { sortBy } from 'lodash';

export default Vue.extend({
  name: 'AutoSearch',
  components: { Autocomplete },
  mounted() {
    this.loadCountries();
  },
  data() {
    return { countries: [], countryId: ''};
  },
  methods: {
    loadCountries() {
      axios.get('/api/countries')
        .then(response => {
          this.countries = sortBy(response.data, ["name"]);
        });
    },
    onCountrySelect(selectedItem) {
      this.countryId = selectedItem.value;
      EventBus.$emit('Map:Searched', this.countryId);
    },
  },
  template: autoSearch,
});
