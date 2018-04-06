import Vue from "vue";
import editForm from "./edit-questionnaire.html";
import axios from "axios";
import VeeValidate from "vee-validate";
import VModal from 'vue-js-modal';
import Autocomplete from "vuejs-auto-complete";
import 'date-input-polyfill';

const config = {
  fieldsBagName: 'fieldBags',
};
Vue.use(VeeValidate, config);
Vue.use(VModal, { dialog: true });

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
    notifier(props) {
      this.$notify({
        group: 'custom-template',
        title: props.title,
        text: props.message,
        type: props.type
      });
    },
    saveData(action) {
      const loadingElement = document.querySelector(".loading");
      if(loadingElement)
        loadingElement.style.display = "none";

      let url = '/api/countries/'+ action;

      axios.post(url, {
        countryId: this.countrySummary.countryId,
        countrySummary: this.countrySummary,
        healthIndicators: this.getHealthIndicators(),
      }).then(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        const loadingElement = document.querySelector(".loading");
        if(loadingElement)
          loadingElement.style.display = "none";
      }).catch(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.notifier({title: 'Error',message: 'Something has gone wrong. Please refresh the Page!', type: 'error'});
        const loadingElement = document.querySelector(".loading");
        if(loadingElement)
          loadingElement.style.display = "none";
      });
    },
    validator(action, successMessage){
      return this.$validator.validateAll().then((result) => {
        if (result) {
          this.saveData(action);
          this.notifier({title: 'Success',message: successMessage, type: 'success'});
          this.showEdit = false;
        } else {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          this.notifier({title: 'Error',message: 'Please correct the below highlighted fields.', type: 'error'});
        }
      })
    },
    saveCorrection() {
      this.saveData('saveCorrection');
      this.notifier({title: 'Success',message: 'Form saved successfully!', type: 'success'});
    },
    submit() {
      return this.validator('submit', 'Form submitted for review');
    },
    save(){
      this.saveData('save');
      this.notifier({title: 'Success',message: 'Form saved successfully!', type: 'success'});
    },
    extracted: function () {
      this.questionnaire.forEach((category) => {
        this.$set(category, 'showCategory', true);
      });
      return this.validator('publish', 'Data is now live');
    },
    publish(){
      this.$modal.show('dialog', {
        title: 'Confirmation',
        text: "Publish health index form for "+ this.countrySummary.countryName +", this cannot be reverted",
        buttons: [
          {
            title: 'Cancel'
          },
          {
            title: 'Confirm',
            handler: () => {
              this.extracted();
              this.$modal.hide('dialog');
            }
          }
        ]
      });
    },
    getHealthIndicators() {
      return Object.entries(this.healthIndicators).map((entry) => entry[1]);
    },
    onCategoryExpand(category) {
      category.showCategory = !category.showCategory;
    }
  },
  template: editForm,
});
