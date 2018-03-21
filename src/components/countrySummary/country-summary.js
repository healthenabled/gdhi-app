import Vue from 'vue';
import countrySummary from './country-summary.html';
import axios from 'axios';
import devMapKey from '../../common/common';

export default Vue.extend({
  name: 'CountrySummary',
  data() {
    return {
      countrySummaries: {},
      mapEnv: devMapKey,
      countryName: this.$route.params.countryCode.slice(0, 2), // Google supports only 2 characters of country code.
    };
  },
  created() {
    $('.loading').show();
    this.getCountrySummary(this.$route.params.countryCode);
  },
  methods: {
    getCountrySummary(countryCode) {
      const countrySummaryUrl = `/api/countries/${countryCode}/country_summary`;
      axios.get(countrySummaryUrl)
        .then((response) => this.countrySummaryCallback(response, countryCode))
        .catch(e => {
          console.log('Error pulling development indicators data');
        });
    },
    countrySummaryCallback(response, countryCode) {
      this.countrySummaries = response.data;
      this.countryName = (this.countrySummaries.countryName) ? this.countrySummaries.countryName : countryCode.slice(0, 2);
      $('.loading').hide();
    },
  },
  template: countrySummary,
});
