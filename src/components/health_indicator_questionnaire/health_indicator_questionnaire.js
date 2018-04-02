import Vue from 'vue';
import healthIndicatorForm from './health_indicator_questionnaire.html';
import editQuestionnaire from './edit-questionaire.js';
import axios from 'axios';
import _ from 'lodash';
import expandCollapseHelper from './expand-collapse-helper';
import VeeValidate from 'vee-validate';

const config = {
  fieldsBagName: 'fieldBags',
};
Vue.use(VeeValidate, config);

export default Vue.extend({
  components: {
    editQuestionnaire
  },
  data() {
    const countrySummary = {
      dataFeederName: '',
      dataFeederRole: '',
      dataFeederEmail: '',
      dataCollectorName: '',
      dataCollectorRole: '',
      dataCollectorEmail: '',
      collectedDate: '',
      summary: '',
      resources: [],
      contactName: '',
      contactDesignation: '',
      contactOrganization: '',
      contactEmail: '',
    };
    const healthIndicators = {};
    return {
      questionnaire: [], countrySummary, healthIndicators, showEdit: true,
    };
  },
  created() {
    if (this.$route.params.countryUUID) {
      this.showEdit = true;
      $('.loading').show();
      this.prepareDataForViewForm(this.$route.params.countryUUID);
    }
  },
  methods: {
    fetchHealthScoresFor(countryUUID) {
      return axios.get(`/api/countries/${countryUUID}`);
    },
    setUpHealthIndicators(data, isExpanded) {
      data.forEach((category) => {
        this.$set(category, 'showCategory', isExpanded);
        category.indicators.forEach(indicator => {
          this.healthIndicators[indicator.indicatorId] = {
            categoryId: category.categoryId,
            indicatorId: indicator.indicatorId,
            score: null,
            supportingText: '',
          };
          $('.loading').hide();
        });
      });
    },
    viewFormCallback(options, scores) {
      this.questionnaire = options.data;
      this.countrySummary = scores.data.countrySummary;
      if(scores.data.healthIndicators.length == 0){
        this.setUpHealthIndicators(options.data,false)
      }else{
        options.data.forEach((category) => {
          this.$set(category, 'showCategory', false);
        });
        this.transformForView(scores.data.healthIndicators);
      }
      $('.loading').hide();
    },
    prepareDataForViewForm(countryUUID) {
      axios.all([axios.get('/api/health_indicator_options'),
        this.fetchHealthScoresFor(countryUUID)])
        .then(axios.spread(this.viewFormCallback.bind(this)))
        .catch(() => {
          location.href = "/error";
        });
    },
    transformForView(healthindicators) {
      const self = this;
      _.each(healthindicators, (indicator) => {
        self.healthIndicators[indicator.indicatorId] = {
          categoryId: indicator.categoryId,
          indicatorId: indicator.indicatorId,
          score: indicator.score,
          supportingText: indicator.supportingText,
        };

      });
    },
  },
  template: healthIndicatorForm,
});
