import Vue from "vue";
import editForm from "./edit-questionnaire.html";
import axios from "axios";
import VeeValidate from "vee-validate";
import Autocomplete from "vuejs-auto-complete";
import 'date-input-polyfill';
import VuejsDialog from "vuejs-dialog"
import common from '../../common/common'

const config = {
  fieldsBagName: 'fieldBags',
};
Vue.use(VeeValidate, config);
Vue.use(VuejsDialog)

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
      common.hideLoading();

      let url = '/api/countries/'+ action;

      axios.post(url, {
        countryId: this.countrySummary.countryId,
        countrySummary: this.countrySummary,
        healthIndicators: this.getHealthIndicators(),
      }).then(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        common.hideLoading();
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
        this.showEdit = false;
        this.notifier({title: 'Success',message: 'Form Data Deleted Successfully. Redirecting to Admin Page', type: 'success'});
        setTimeout(this.redirectToAdmin, 2000);
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
    getConfirmationDialog (props) {
      let options = { okText: 'Confirm', cancelText: 'Cancel'};
      return this.$dialog.confirm(props.message , options)
        .then(() => {
          return props.callBackMethod.apply(this, props.callBackArgs);
        }).catch(() => {
          console.log('some error');
        });
    },
    publish() {
      this.questionnaire.forEach((category) => {
        this.$set(category, 'showCategory', true);
      });
      this.getConfirmationDialog({message: 'Publish health index form for ' + this.countrySummary.countryName
        + ', this cannot be reverted', callBackMethod: this.validator, callBackArgs: ['publish', 'Data is now live']});
    },
    reject() {
      this.getConfirmationDialog({message: 'Reject health index form for ' + this.countrySummary.countryName
        + ', this cannot be reverted', callBackMethod: this.deleteData, callBackArgs: []});
    },
    redirectToAdmin() {
      this.$router.push({ path: `/admin` });
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
