import Vue from 'vue'
import viewForm from './view-questionnaire.html'
export default Vue.extend({
  template: viewForm,
  props: ['questionnaire', 'countrySummary', 'healthIndicators']
})
