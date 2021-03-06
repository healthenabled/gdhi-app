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
          this.countrySummaryCallback(response)
        })
        .catch(e => {
          this.error = e.response.message;
        });
    },
    countrySummaryCallback(response) {
      this.countrySummaries = response.data;
      this.$emit('summaryLoaded', this.countrySummaries.summary);
      common.hideLoading();
    },
  },
  template: countrySummary,
});
