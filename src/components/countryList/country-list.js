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
    };
  },

  mounted() {
    common.showLoading();
    this.getListOfCountries().then( (response) => {
      this.countryListCallback(response);
    });
  },

  methods: {
    countryListCallback(globalHealthIndices) {
      this.globalHealthIndicators = globalHealthIndices.data.countryHealthScores;
      this.listCountries(globalHealthIndices.data.countryHealthScores);
    },
    getListOfCountries() {
      const windowProperties = window.appProperties;
      return axios.get(`/api/countries_health_indicator_scores?categoryId=${windowProperties.getCategoryFilter()}&phase=${windowProperties.getPhaseFilter()}`);
    },
    listCountries(countriesDetails) {
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
  },
  template: countryList,
});
