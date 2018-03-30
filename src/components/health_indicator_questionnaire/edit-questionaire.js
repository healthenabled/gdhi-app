import Vue from "vue";
import editForm from "./edit-questionnaire.html";
import axios from "axios";
import VeeValidate from "vee-validate";
import Autocomplete from "vuejs-auto-complete";

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
        return [];
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
    submit() {
      return this.$validator.validateAll().then((result) => {
        if (result) {
          this.saveData(true);
        } else {
          this.success = false;
          this.error = true;
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
      })
    },
    save(){
      this.saveData(false);
    },
    saveData(isSubmit) {
      $('.loading').show();
      let url;
      if (isSubmit) {
        url = '/api/countries/submit'
      } else {
        url = '/api/countries/save';
      }
      axios.post(url, {
        countryId: this.countrySummary.countryId,
        countrySummary: this.countrySummary,
        healthIndicators: this.getHealthIndicators(),
      }).then(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.success = true;
        this.error = false;
        this.exception = false;
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
