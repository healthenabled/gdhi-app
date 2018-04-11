import Vue from 'vue';
import countrySummary from './country-summary.html';
import axios from 'axios';
import common from '../../common/common'

export default Vue.extend({
  name: 'CountrySummary',
  data() {
    return {
      countrySummaries: {},
      error: ''
    };
  },
  mounted() {
    common.showLoading();
    this.getCountrySummary(this.$route.params.countryCode);
  },
  methods: {
    getCountrySummary(countryCode) {
      const countrySummaryUrl = `/api/countries/${countryCode}/country_summary`;
      axios.get(countrySummaryUrl)
        .then((response) => {
          this.countrySummaryCallback(response, countryCode)
        })
        .catch(e => {
          this.error = e.response.message;
        });
    },
    countrySummaryCallback(response, countryCode) {
      this.countrySummaries = response.data;
      common.hideLoading();
    },
  },
  template: countrySummary,
});
