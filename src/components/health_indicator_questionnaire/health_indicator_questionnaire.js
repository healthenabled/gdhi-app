import Vue from 'vue';
import healthIndicatorForm from './health_indicator_questionnaire.html';
import editQuestionnaire from './edit-questionaire.js';
import axios from 'axios';
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
      const loadingElement = document.querySelector(".loading");
          if(loadingElement)
            loadingElement.style.display = "block";
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
          const loadingElement = document.querySelector(".loading");
          if(loadingElement)
            loadingElement.style.display = "none";
        });
      });
    },
    viewFormCallback(options, scores) {
      this.questionnaire = options.data;
      this.countrySummary = scores.data.countrySummary;
      if(scores.data.status == "REVIEW_PENDING" && !this.$route.path.match('review')) {
        this.showEdit = false;
      }
      if(scores.data.healthIndicators.length == 0){
        this.setUpHealthIndicators(options.data,false)
      }else{
        options.data.forEach((category) => {
          this.$set(category, 'showCategory', false);
        });
        this.transformForView(scores.data.healthIndicators);
      }
      const loadingElement = document.querySelector(".loading");
          if(loadingElement)
            loadingElement.style.display = "none";
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
      healthindicators.forEach((indicator) => {
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
