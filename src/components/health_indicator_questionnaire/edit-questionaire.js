import Vue from 'vue';
import editForm from './edit-questionnaire.html';
import axios from 'axios';
import autoSuggest from '../auto-search/auto-search';
import countryHelper from '../../common/country';
import VeeValidate from 'vee-validate';
import expandCollapseHelper from './expand-collapse-helper';

VeeValidate.Validator.extend('countryName', countryHelper.countryNameValidator);
const config = {
  fieldsBagName: 'fieldBags',
};
Vue.use(VeeValidate, config);

export default Vue.extend({
  components: { autoSuggest },
  props: {
    questionnaire: {
      type: Object,
      default() {
        return {};
      },
    },
    countrySummary: {
      type: Object,
      default() {
        return {};
      },
    },
    healthIndicators: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return { success: false, error: false, exception:false, countryId: '' };
  },
  mounted() {
    $('.loading').show();
    this.loadCountries();
  },
  methods: {
    loadCountries() {
      countryHelper.loadCountries().then((response) => {
        this.countries = response.data;
        const options = countryHelper.loadSearchData(this.countries, this.onCountrySelect.bind(this));
        $('#countryName').easyAutocomplete(options);
        $('.loading').hide();
      });
    },
    onCountrySelect() {
      const countryId = $('#countryName').getSelectedItemData().id;
      this.countryId = countryId;
    },
    validateCallback(result) {
      const isValid = result && this.validateCountryId();
      if (isValid) {
        this.save();
      } else {
        this.success = false;
        this.error = true;
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
    },
    submit() {
      this.$validator.validateAll().then(this.validateCallback.bind(this));
    },
    getSelectedCountryName() {
      return $('#countryName').val();
    },
    validateCountryId() {
      const selectedCountry = this.countries.find((country) => country.name === this.getSelectedCountryName());
      if (selectedCountry) {
        this.countryId = selectedCountry.id;
        return true;
      }
      this.countryId = '';
      return false;
    },
    save() {
      $('.loading').show();
      axios.post('/api/countries', {
        countryId: this.countryId,
        countrySummary: this.countrySummary,
        healthIndicators: this.getHealthIndicators(),
      }).then(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.success = true;
        this.error = false;
        $('.loading').hide();
      }).catch(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.success = false;
        this.exception = true;
        $('.loading').hide();
      });
    },
    getHealthIndicators() {
      return Object.entries(this.healthIndicators).map((entry) => entry[1]);
    },
    onIndicatorExpand(indicator) {
      indicator.showIndicator = !indicator.showIndicator;
      indicator.expandCollapseBtn = expandCollapseHelper.toggleCaption(indicator.expandCollapseBtn);
    },
  },
  template: editForm,
});
