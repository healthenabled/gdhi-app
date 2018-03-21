import Vue from 'vue';
import viewForm from './view-questionnaire.html';

export default Vue.extend({
  props: {
    questionnaire: {
      type: Object,
      default() {
        return {};
      },
    },
    countrySummary: {
      type: Object,
      default() {
        return {};
      },
    },
    healthIndicators: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  template: viewForm,
});
