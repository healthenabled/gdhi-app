import Vue from 'vue';
import countryProfile from './countryProfile.html';
import developmentIndicators from '../developmentIndicators/development-indicators.js';
import countrySummary from '../countrySummary/country-summary.js';
import axios from 'axios';
import {generateScorecard} from '../pdfHelper/pdf-generate-scorecard';
import {isEmpty} from 'lodash';
import Notifications from 'vue-notification';
import common from '../../common/common';

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
      locale: 'en',
    };
  },

  mounted() {
    this.getHealthIndicatorsFor(this.$route.params.countryCode);
    this.url = `/api/export_country_data/${this.$route.params.countryCode}`;
    this.fetchPhases();
  },
  updated() {
    if (this.locale !== this.$i18n.locale) {
      this.getHealthIndicatorsFor(this.$route.params.countryCode);
      if (this.healthIndicatorData && this.healthIndicatorData.collectedDate) {
        this.updateCollectedDate(this.healthIndicatorData.collectedDate);
      }
      this.locale = this.$i18n.locale;
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
      axios.get(`/api/countries/${countryCode}/health_indicators`, common.configWithUserLanguageAndNoCacheHeader(this.$i18n.locale))
        .then((response) => {
          this.healthIndicatorCallback(response);
        });
    },
    updateCollectedDate(date) {
      this.collectedDate = common.dateInLocaleFormat(date, this.$i18n);
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
      if (this.$i18n.locale === 'ar') {
        window.print();
      } else {
        generateScorecard(this.healthIndicatorData, this.countrySummary, this.benchmarkData, this.benchmarkPhase, this.hasBenchmarkData, this.$i18n);
      }
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
              title: this.$i18n.t('mixed.noData'),
              message: this.$i18n.t('countryProfile.benchmark.benchmarkNoCountryForSelectedPhase'),
              type: 'warn'
            });
          } else {
            this.healthIndicatorData.categories.forEach((category) => {
              this.$set(category, 'showCategory', true);
            });
          }
        })
        .catch(() => {
          this.notifier({
            title: this.$i18n.t('mixed.serverErrorTitle'),
            message: this.$i18n.t('countryProfile.benchmark.serverErrorDescription'),
            type: 'error'
          });
        });
    },
    countryDataSheetUrl() {
      return `/api/export_country_data/${this.$route.params.countryCode}?user_language=${this.$i18n.locale}`;
    },
    getLocaleBenchmarkValue(indicatorId) {
      const value = this.benchmarkData[indicatorId].benchmarkValue.toLowerCase();
      const formatMapping = {
        'at': this.$i18n.t('countryProfile.benchmark.benchmarkValues.atAvg'),
        'above': this.$i18n.t('countryProfile.benchmark.benchmarkValues.aboveAvg'),
        'below': this.$i18n.t('countryProfile.benchmark.benchmarkValues.belowAvg'),
      };

      return formatMapping[value];
    }

  },
  template: countryProfile,
});
