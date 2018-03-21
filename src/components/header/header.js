import Vue from 'vue';
import header from './header.html';

export default Vue.extend({
  name: 'Header',

  data() {
    return {
      countries: {},
      developmentIndicators: [],
      healthIndicators: {},
    };
  },
  template: header,
});
