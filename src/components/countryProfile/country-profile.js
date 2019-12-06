import Vue from 'vue';
import countryProfile from './countryProfile.html';
import developmentIndicators from '../developmentIndicators/development-indicators.js';
import countrySummary from '../countrySummary/country-summary.js';
import axios from 'axios';
import {generateScorecard} from '../pdfHelper/pdf-generate-scorecard';
import {isEmpty} from 'lodash';
import Notifications from 'vue-notification';

Vue.use(Notifications);

export default Vue.extend({

  components: {developmentIndicators, countrySummary, Notifications},
  data() {
    return {
      healthIndicatorData: {countryName: '', countryPhase: 'NA', categories: []},
      flagSrc: '',
      url: '',
      benchmarkData: {},
      benchmarkPhase: '',
      phases: [],
      countrySummary: '',
      hasBenchmarkData: true,
      collectedDate: '',
    };
  },

  mounted() {
    this.getHealthIndicatorsFor(this.$route.params.countryCode);
    this.url = `/api/export_country_data/${this.$route.params.countryCode}`;
    this.fetchPhases();
  },
  updated() {
    if (this.healthIndicatorData && this.healthIndicatorData.collectedDate) {
      this.updateCollectedDate(this.healthIndicatorData.collectedDate);
    }
  },
  methods: {
    fetchPhases() {
      axios.get('/api/phases').then((response) => {
        this.phases = response.data;
      });
    },
    onSummaryLoaded(countrySummary) {
      this.countrySummary = countrySummary;
    },
    getHealthIndicatorsFor(countryCode) {
      axios.get(`/api/countries/${countryCode}/health_indicators`)
        .then((response) => {
          this.healthIndicatorCallback(response);
        });
    },
    updateCollectedDate(date) {
      let digitsOfYear = 4;
      const year = date.slice(-digitsOfYear);
      const month = date.slice(-date.length, -(digitsOfYear + 1));
      const monthInLocale = this.$i18n.t(`date.month.${month}`);
      this.collectedDate = this.$i18n.t('date.dateFormat1', {year: year, month: monthInLocale});
    },

    healthIndicatorCallback(response) {
      this.healthIndicatorData = response.data;
      this.updateCollectedDate(this.healthIndicatorData.collectedDate);
      this.flagSrc = `/static/img/flags/${response.data.countryAlpha2Code.toLowerCase()}.svg`;
      this.initialise();
    },
    onCategoryExpand(category) {
      category.showCategory = !category.showCategory;
    },
    initialise() {
      this.healthIndicatorData.categories.forEach((category) => {
        this.$set(category, 'showCategory', false);
      });
    },
    generatePDF() {
      generateScorecard(this.healthIndicatorData, this.countrySummary, this.benchmarkData, this.benchmarkPhase, this.hasBenchmarkData);
    },
    notifier(props) {
      this.$notify({
        group: 'custom-template',
        title: props.title,
        text: props.message,
        type: props.type
      });
    },
    getBenchmarkData() {
      this.benchmarkData = {};
      this.hasBenchmarkData = true;
      if (this.benchmarkPhase === '') {
        return;
      }
      axios.get(`/api/countries/${this.$route.params.countryCode}/benchmark/${this.benchmarkPhase}`)
        .then((response) => {
          this.benchmarkData = response.data;
          if (isEmpty(this.benchmarkData)) {
            this.hasBenchmarkData = false;
            this.notifier({
              title: 'No Data',
              message: 'No countries in the selected phase for benchmarking',
              type: 'warn'
            });
          } else {
            this.healthIndicatorData.categories.forEach((category) => {
              this.$set(category, 'showCategory', true);
            });
          }
        })
        .catch((e) => {
          this.notifier({
            title: 'Server Error',
            message: 'Unable to load benchmark data. Please try after sometime',
            type: 'error'
          });
        });
    }
  },
  template: countryProfile,
});
