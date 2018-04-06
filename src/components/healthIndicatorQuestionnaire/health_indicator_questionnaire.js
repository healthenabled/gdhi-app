import Vue from "vue";
import healthIndicatorForm from "./health_indicator_questionnaire.html";
import editQuestionnaire from "./edit-questionaire.js";
import axios from "axios";
import VeeValidate from "vee-validate";
import common from '../../common/common'

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
      dataApproverName: '',
      dataApproverRole: '',
      dataApproverEmail: '',
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
      questionnaire: [], countrySummary, healthIndicators, showEdit: true, status, isAdmin: false,
    };
  },
  created() {
    if (this.$route.params.countryUUID) {
      this.showEdit = true;
      common.showLoading();
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
          common.hideLoading();
        });
      });
    },
    setUpDataForNewHealthIndicators(data, existingHealthIndicators) {
      let existingIndicatorIds = existingHealthIndicators.map(indicator => indicator.indicatorId);
      data.forEach((category) => {
        category.indicators.forEach(indicator => {
          if(!existingIndicatorIds.includes(indicator.indicatorId)) {
            this.healthIndicators[indicator.indicatorId] = {
              categoryId: category.categoryId,
              indicatorId: indicator.indicatorId,
              score: null,
              supportingText: '',
            };
          }
        });
      });
    },
    viewFormCallback(options, scores) {
      this.status = scores.data.status;
      if(this.status === "PUBLISHED")
        window.location.href = '/error';
      this.questionnaire = options.data;
      this.countrySummary = scores.data.countrySummary;
      this.isAdmin = this.$route.path.match('review') != null;
      if(scores.data.status == "REVIEW_PENDING" && !this.isAdmin) {
        this.showEdit = false;
      }
      if(scores.data.healthIndicators.length == 0){
        this.setUpHealthIndicators(options.data,false)
      }else{
        this.setUpDataForNewHealthIndicators(options.data, scores.data.healthIndicators);
        options.data.forEach((category) => {
          this.$set(category, 'showCategory', false);
        });
        this.transformForView(scores.data.healthIndicators);
      }
      common.hideLoading();
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
