import Vue from 'vue';
import countryList from './country-list.html';
import axios from 'axios';
import _ from 'lodash';

export default Vue.extend({
  name: 'CountryList',

  data() {
    return {
      countryList: [],
      globalHealthIndicators: [],
    };
  },

  mounted() {
    const loadingElement = document.querySelector(".loading");
    if(loadingElement)
      loadingElement.style.display = "block";
    this.getListOfCountries().then(this.countryListCallback.bind(this));
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
      _.each(countriesDetails, country => {
        const countryDetail = {
          countryName: country.countryName,
          overallPhase: country.countryPhase,
          countryId: country.countryId,
        };
        this.countryList.push(countryDetail);
        const loadingElement = document.querySelector(".loading");
        if(loadingElement)
          loadingElement.style.display = "none";
      });
    },
    showCountryDetails(countryId) {
      this.$router.push({ path: `/country_profile/${countryId}` });
    },
  },
  template: countryList,
});
