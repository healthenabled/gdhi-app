import Vue from 'vue';
import developmentIndicatorsTemplate from './development-indicators.html';
import httpRequests from '../../common/indicator-http-requests';
import common from '../../common/common'

export default Vue.extend({
  name: 'DevelopmentIndicators',
  data() {
    return {
      developmentIndicators: [],
    };
  },
  mounted() {
    this.getDevelopmentIndicatorsFor(this.$route.params.countryCode);
  },
  methods: {
    getDevelopmentIndicatorsFor(countryCode) {
      common.showLoading();
      httpRequests.getDevelopmentIndicators(countryCode, false).then((response) => {
        this.developmentIndicators = response;
      });
    },
  },
  template: developmentIndicatorsTemplate,
});
