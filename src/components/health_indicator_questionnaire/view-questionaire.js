import Vue from 'vue'
import viewForm from './view-questionnaire.html'
import expandCollapseHelper from './expand-collapse-helper'
export default Vue.extend({
  template: viewForm,
  props: ['questionnaire', 'countrySummary', 'healthIndicators'],
  methods: {
    onIndicatorExpand (indicator) {
      indicator.showIndicator = !indicator.showIndicator
      indicator.expandCollapseBtn = expandCollapseHelper.toggleCaption(
        indicator.expandCollapseBtn)
    }
  }
})
