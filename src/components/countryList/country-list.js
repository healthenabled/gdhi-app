import Vue from 'vue';
import countryList from './country-list.html';
import axios from 'axios';
import common from '../../common/common'

export default Vue.extend({
  name: 'CountryList',

  data() {
    return {
      countryList: [],
      globalHealthIndicators: [],
      locale: 'en',
    };
  },

  mounted() {
    common.showLoading();
    this.getListOfCountries();
  },
  updated(){
    if (this.locale !== this.$i18n.locale) {
      this.getListOfCountries();
      this.locale = this.$i18n.locale;
    }
  },

  methods: {
    countryListCallback(globalHealthIndices) {
      this.globalHealthIndicators = globalHealthIndices.data.countryHealthScores;
      this.listCountries(globalHealthIndices.data.countryHealthScores);
    },
    getListOfCountries() {
      const windowProperties = window.appProperties;
      return axios.get(`/api/countries_health_indicator_scores?categoryId=${windowProperties.getCategoryFilter()}&phase=${windowProperties.getPhaseFilter()}`,
        common.configWithUserLanguageAndNoCacheHeader(this.$i18n.locale)).then( (response) => {
        this.countryListCallback(response);
      });
    },
    listCountries(countriesDetails) {
      this.countryList =[];
      countriesDetails.forEach((country) => {
        const countryDetail = {
          countryName: country.countryName,
          overallPhase: country.countryPhase,
          countryId: country.countryId,
        };
        this.countryList.push(countryDetail);
        common.hideLoading();
      });

    },
    showCountryDetails(countryId) {
      this.$router.push({ path: `/country_profile/${countryId}` });
    },
    dataSheetUrl() {
      return `/api/export_global_data?user_language=${this.$i18n.locale}`
    },
  },
  template: countryList,
});
