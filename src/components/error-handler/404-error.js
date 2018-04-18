import Vue from 'vue';
import errorTemplate from './error.html';
import common from '../../common/common'

export default Vue.extend({
  template: errorTemplate,
  data() {
    return {
      errorMessage: 'Page Not Found!.',
    };
  },
  mounted() {
    common.hideLoading();
  },
  name: "ErrorComp"
});
