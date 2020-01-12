import Vue from 'vue';
import indicatorPanel from './indicator-panel.html';
import axios from 'axios';
import httpRequests from '../../common/indicator-http-requests';
import common from '../../common/common';

export default Vue.extend({
  name: 'IndicatorPanel',

  data() {
    return {
      developmentIndicators: [],
      healthIndicators: {},
      globalHealthIndicators: {},
      showCountryDetail: true,
      country: {},
      categoryFilter: window.appProperties.getCategoryFilter(),
      indicatorPanelTitle: this.getIndicatorContainerName(),
      phaseTitle: '',
      isListOfCategoriesApplicable: this.areCategoriesApplicable(),
      isNoGlobalHealthIndicators: false,
      locale: 'en',
    };
  },

  mounted() {
    common.showLoading();
    this.getGlobalHealthIndicators();
    if (this.$parent) {
      this.$parent.$on('Map:Clicked', ($clickedEl) => {
        if ($clickedEl.type === 'COUNTRY') {
          this.country.countryName = $clickedEl.countryName;
          this.country.countryCode = $clickedEl.countryCode;
          this.getIndicators(this, this.country.countryCode);
        } else if ($clickedEl.type === 'GLOBAL') {
          this.getGlobalHealthIndicators();
        }
      });
      this.$parent.$on('filtered', () => {
        this.getGlobalHealthIndicators();
      });
    }
  },
  updated() {
    this.indicatorPanelTitle = this.getIndicatorContainerName();
    if (this.locale !== this.$i18n.locale) {
      this.getGlobalHealthIndicators();
      if(this.country.countryCode){
        this.getIndicators(this, this.country.countryCode);
      }
      this.locale = this.$i18n.locale;
    }
  },

  methods: {

    setIndicatorTitleAndCategoryApplicability() {
      this.indicatorPanelTitle = this.getIndicatorContainerName();
      this.phaseTitle = this.getPhaseTitle();
      this.isListOfCategoriesApplicable = this.areCategoriesApplicable();
      this.isNoGlobalHealthIndicators = this.isNoGlobalHealthIndicatorsPresent();
    },

    areCategoriesApplicable() {
      return this.categoryFilter || this.isNoFilterPresent();
    },

    isNoFilterPresent() {
      return !this.categoryFilter && !this.phaseFilter;
    },

    getIndicatorContainerName() {
      let indicatorPanelTitle = '';
      if (this.categoryFilter) {
        indicatorPanelTitle = this.getCategoryAsTitle();
      } else {
        indicatorPanelTitle = this.phaseFilter
          ? this.$i18n.t('mixed.textOverAll')
          : this.$i18n.t('worldMap.indicatorPanel.indicatorPanelTitle');
      }
      return indicatorPanelTitle;
    },

    getCategoryAsTitle() {
      const category = this.globalHealthIndicators.categories[0];
      return category ? category.name : 'No countries available for the selected criteria';
    },

    isNoGlobalHealthIndicatorsPresent() {
      return this.globalHealthIndicators.categories.length === 0;
    },

    getPhaseTitle() {
      const phaseTitle = this.phaseFilter ? 'Phase '.concat(this.phaseFilter) : 'Global Average';
      return this.isNoGlobalHealthIndicatorsPresent() || this.isNoFilterPresent() ? '' : phaseTitle;
    },

    getIndicators(context, countryId) {
      this.getHealthIndicators(context, countryId);
      httpRequests.getDevelopmentIndicators(countryId, true).then((response) => {
        this.developmentIndicators = response;
      });
    },

    getHealthIndicators(context, countryId) {
      const healthIndicatorsUrl = `/api/countries/${countryId}/health_indicators`;
      axios.get(healthIndicatorsUrl, common.configWithUserLanguageAndNoCacheHeader(this.$i18n.locale))
        .then((response) => {
          this.getHealthIndicatorCallback(response);
        });
        /* TODO: Handle error at component Level
        .catch(e => {
          console.log('Error pulling health indicators data');
        });
        */
    },
    getHealthIndicatorCallback(response) {
      const healthIndicatorsData = {
        countryId: response.data.countryId,
        countryName: response.data.countryName,
        categories: response.data.categories,
        countryPhase: response.data.countryPhase,
      };
      this.healthIndicators = healthIndicatorsData;
      this.showCountryDetail = true;
      this.isNoGlobalHealthIndicators = true;
      this.country.countryName = this.country.countryName ? this.country.countryName : healthIndicatorsData.countryName;
    },

    getGlobalHealthIndicators() {
      const windowProperties = window.appProperties;
      const globalHealthIndicatorsUrl = `/api/global_health_indicators?categoryId=${windowProperties.getCategoryFilter()}&phase=${windowProperties.getPhaseFilter()}`;
      axios.get(globalHealthIndicatorsUrl, common.configWithUserLanguageAndNoCacheHeader(this.$i18n.locale))
        .then((response) => {
          this.getGlobalHealthIndicatorCallback(response);
        });
        /* TODO: Handle error at component Level
        .catch((e) => {
          common.hideLoading();
          console.log('Error pulling health indicators data');
        });
        */
    },
    getGlobalHealthIndicatorCallback(response) {
      const globalHealthIndicatorsData = {
        overallCountryScore: response.data.overAllScore,
        categories: response.data.categories,
      };
      this.globalHealthIndicators = globalHealthIndicatorsData;
      this.categoryFilter = window.appProperties.getCategoryFilter();
      this.phaseFilter = window.appProperties.getPhaseFilter();
      this.setIndicatorTitleAndCategoryApplicability();
      this.showCountryDetail = false;
      common.hideLoading();
    },

    showCountryDetails(countryId) {
      this.$router.push({ path: `/country_profile/${countryId}` });
    },

    showListOfCountries() {
      this.$router.push({ path: '/country_list' });
    },
  },
  template: indicatorPanel,
});
