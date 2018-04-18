import Vue from "vue";
import editForm from "./edit-questionnaire.html";
import axios from "axios";
import VeeValidate from "vee-validate";
import VuejsDialog from "vuejs-dialog";
import common from '../../common/common';
import dateFormat from 'dateformat';
import { generateFormPDF } from "../pdfHelper/pdf-generate";

const config = {
  fieldsBagName: 'fieldBags',
};
Vue.use(VeeValidate, config);
Vue.use(VuejsDialog);

export default Vue.extend({
  name: 'EditQuestionnaire',
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
    today: {
      type: String,
      default() {
        return dateFormat(new Date(), "dd-mm-yyyy");
      }
    }
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
    saveData(action, successMessage) {
      common.hideLoading();

      let url = '/api/countries/'+ action;

      axios.post(url, {
        countryId: this.countrySummary.countryId,
        countrySummary: this.countrySummary,
        healthIndicators: this.getHealthIndicators(),
      }).then(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        common.hideLoading();
        this.notifier({title: 'Success',message: successMessage, type: 'success'});
      }).catch(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.notifier({title: 'Error',message: 'Something has gone wrong. Please refresh the Page!', type: 'error'});
        common.hideLoading();
      });
    },
    deleteData() {
      common.showLoading();
      let url = '/api/countries/delete'

      axios.post(url, {
        countryId: this.countrySummary.countryId
      }).then(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.$router.push({ path: `/admin` });
        common.hideLoading();
      }).catch(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.notifier({title: 'Error',message: 'Something has gone wrong. Please refresh the Page!', type: 'error'});
        common.hideLoading();
      });
    },
    validator(action, successMessage){
      return this.$validator.validateAll().then((result) => {
        if (result) {
          this.saveData(action);
          if (action === 'publish'){
            this.$router.push({ path: `/admin` });
          } else {
            this.notifier({title: 'Success', message: successMessage, type: 'success'});
            this.showEdit = false;
          }
        } else {
          this.questionnaire.forEach((category) => {
            this.$set(category, 'showCategory', true);
          });
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          this.notifier({title: 'Error',message: 'Please correct the highlighted fields.', type: 'error'});
        }
      })
    },
    saveCorrection() {
      this.saveData('saveCorrection', 'Form saved successfully!');
    },
    submit() {
      return this.validator('submit', 'Form submitted for review');
    },
    save(){
      this.saveData('save', 'Form saved successfully!');
    },
    getConfirmationDialog (props) {
      let options = { okText: 'Confirm', cancelText: 'Cancel'};
      return this.$dialog.confirm(props.message , options)
        .then(() => {
          return props.callBackMethod.apply(this, props.callBackArgs);
        });
    },
    publish() {
      this.questionnaire.forEach((category) => {
        this.$set(category, 'showCategory', true);
      });
      this.getConfirmationDialog({message: 'You are about to publish digital health index form for ' + this.countrySummary.countryName
        + ', this cannot be reverted. Do you want to continue?', callBackMethod: this.validator, callBackArgs: ['publish', 'Data is now live']});
    },
    reject() {
      this.getConfirmationDialog({message: 'You are about to reject health index form for ' + this.countrySummary.countryName
        + ', this cannot be reverted. Do you want to continue?', callBackMethod: this.deleteData, callBackArgs: []});
    },
    getHealthIndicators() {
      return Object.entries(this.healthIndicators).map((entry) => entry[1]);
    },
    onCategoryExpand(category) {
      category.showCategory = !category.showCategory;
    },
    generatePDF() {
      this.notifier({title: 'Success',message: "Download Started Successfully", type: 'success'});
      generateFormPDF(this.countrySummary, this.questionnaire, this.healthIndicators);
    }
  },
  template: editForm,
});
