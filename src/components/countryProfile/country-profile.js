import Vue from 'vue';
import countryProfile from './countryProfile.html';
import developmentIndicators from '../developmentIndicators/development-indicators.js';
import countrySummary from '../countrySummary/country-summary.js';
import axios from 'axios';

export default Vue.extend({

  components: { developmentIndicators, countrySummary },
  data() {
    return {
      healthIndicatorData: { countryName: '', countryPhase: 'NA', categories: [] },
      flagSrc: '',
      url: ''
    };
  },

  mounted() {
    this.getHealthIndicatorsFor(this.$route.params.countryCode);
    this.url = `/api/export_country_data/${this.$route.params.countryCode}`;
  },
  methods: {
    getHealthIndicatorsFor(countryCode) {
      axios.get(`/api/countries/${countryCode}/health_indicators`)
        .then(this.healthIndicatorCallback.bind(this));
    },
    healthIndicatorCallback(response) {
      this.healthIndicatorData = response.data;
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
    }
  },
  template: countryProfile,
});
