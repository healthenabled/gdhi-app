import Vue from 'vue';
import editForm from './edit-questionnaire.html';
import axios from 'axios';
import autoSuggest from '../auto-search/auto-search';
import VeeValidate from 'vee-validate';
import expandCollapseHelper from './expand-collapse-helper';
import Autocomplete from 'vuejs-auto-complete'

const config = {
  fieldsBagName: 'fieldBags',
};
Vue.use(VeeValidate, config);
export default Vue.extend({
  components: { Autocomplete },
  props: {
    questionnaire: {
      type: Array,
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
    showEdit: {
          type: Boolean,
          default() {
            return true;
          },
        },
  },
  data() {
    return { success: false, error: false, exception:false, countryId: '', countries: []};
  },
  mounted() {
    $('.loading').show();
    this.loadCountries();
  },
  methods: {
    loadCountries() {
      axios.get('/api/countries').then((response) => {
        this.countries = response.data;
        $('.loading').hide();
      });
    },
    onCountrySelect(selectedItem) {
      this.countryId = selectedItem.value;
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
    validateCountryId() {
      const selectedCountry = this.countries.find((country) => country.id === this.countryId);
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
    onCategoryExpand(category) {
      category.showCategory = !category.showCategory;
    },
  },
  template: editForm,
});
