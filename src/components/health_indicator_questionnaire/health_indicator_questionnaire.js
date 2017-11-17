import Vue from 'vue'
import healthIndicatorForm from './health_indicator_questionnaire.html'
import axios from 'axios'

export default Vue.extend({
  template: healthIndicatorForm,
  data: function () {
    return {questionnaire: {}}
  },
  mounted: function () {
    this.getQuestionnaire()
  },
  methods: {
    getQuestionnaire: function () {
      axios.get('/api/health_indicator_options').then((response) => {
        this.questionnaire = response.data
      })
    }
  }
})
