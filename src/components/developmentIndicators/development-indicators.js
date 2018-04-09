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
  created() {
    this.getDevelopmentIndicatorsFor(this.$route.params.countryCode);
  },
  methods: {
    getDevelopmentIndicatorsFor(countryCode) {
      common.showLoading();
      const self = this;
      httpRequests.getDevelopmentIndicators(countryCode, false).then((response) => {
        self.developmentIndicators = response;
      });
    },
  },
  template: developmentIndicatorsTemplate,
});
