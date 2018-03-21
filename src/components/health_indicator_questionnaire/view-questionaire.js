import Vue from 'vue';
import viewForm from './view-questionnaire.html';

export default Vue.extend({
  props: {
    questionnaire: {
      type: Object,
      default: function () {
        return {};
      }
    },
    countrySummary: {
      type: Object,
      default: function () {
        return {};
      }
    },
    healthIndicators: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  template: viewForm,
})
