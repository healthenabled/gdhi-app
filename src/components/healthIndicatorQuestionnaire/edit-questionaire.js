import Vue from "vue";
import editForm from "./edit-questionnaire.html";
import axios from "axios";
import VeeValidate from "vee-validate";
import Autocomplete from "vuejs-auto-complete";
import 'date-input-polyfill';

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
    status: {
      type: String,
      default() {
        return "";
      },
    },
    isAdmin: {
          type: Boolean,
          default() {
            return false;
          },
        },
  },
  data() {
    return { countryId: '', countries: []};
  },
  methods: {
    submit() {
      return this.$validator.validateAll().then((result) => {
        if (result) {
          this.saveData(true);
          this.$notify({
            group: 'custom-template',
            title: 'Success',
            text: 'Form successfully submitted for Review',
            type: 'success'
          });
          this.showEdit = false;
        } else {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          this.$notify({
            group: 'custom-template',
            title: 'Error',
            text: 'Please correct the below highlighted fields.',
            type: 'error'
          });
        }
      })
    },
    save(){
      this.saveData(false);
    },
    publish(){

    },
    saveData(isSubmit) {
      const loadingElement = document.querySelector(".loading");
      if(loadingElement)
        loadingElement.style.display = "none";
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
        this.$notify({
          group: 'custom-template',
          title: 'Success',
          text: 'Form saved successfully!',
          type: 'success'
        });
        const loadingElement = document.querySelector(".loading");
        if(loadingElement)
          loadingElement.style.display = "none";
      }).catch(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.$notify({
          group: 'custom-template',
          title: 'Error',
          text: 'Something has gone wrong. Please refresh the Page!',
          type: 'error'
        });
        const loadingElement = document.querySelector(".loading");
        if(loadingElement)
          loadingElement.style.display = "none";
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