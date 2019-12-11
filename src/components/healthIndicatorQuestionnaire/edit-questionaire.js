import Vue from "vue";
import editForm from "./edit-questionnaire.html";
import axios from "axios";
import VeeValidate from "vee-validate";
import VuejsDialog from "vuejs-dialog";
import common from '../../common/common';
import dateFormat from 'dateformat';
import {generateFormPDF} from "../pdfHelper/pdf-generate-form.js";

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
        return {
          resources: []
        };
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
    },
  },
  data() {
    return {
      countryId: '',
      countries: [],
      locale: 'en',
      successMessages: this.getSuccessMessages()
    };
  },
  updated(){
    if(this.locale !== this.$i18n.locale){
      this.successMessages= this.getSuccessMessages();
      this.locale = this.$i18n.locale
    }
  },
  methods: {
    getSuccessMessages() {
      return {
        'submit': this.$i18n.t('healthIndicatorQuestionnaire.notifications.submit'),
        'saveCorrection': this.$i18n.t('healthIndicatorQuestionnaire.notifications.saveCorrection'),
        'save': this.$i18n.t('healthIndicatorQuestionnaire.notifications.save'),
        'publish': this.$i18n.t('healthIndicatorQuestionnaire.notifications.publish'),
      }
    },
    notifier(props) {
      this.$notify({
        group: 'custom-template',
        title: props.title,
        text: props.message,
        type: props.type
      });
    },
    saveData(action) {
      common.showLoading();
      document.body.scrollTop = document.documentElement.scrollTop = 0;

      let url = '/api/countries/' + action;

      axios.post(url, {
        countryId: this.countrySummary.countryId,
        countrySummary: this.countrySummary,
        healthIndicators: this.getHealthIndicators(),
      }, common.configWithUserLanguageHeader(this.$i18n.locale)).then(() => {
        if(action === 'submit') {
          this.showEdit = false;
        }
        common.hideLoading();
        this.notifier({title: 'Success', message: this.successMessages[action], type: 'success'});
        if(action === 'publish'){
          this.$router.push({path: `/admin`});
        }
      }).catch((e) => {
        common.hideLoading();
        if(e.response.status === 400){
          this.notifier({title: 'Error', message: 'Invalid Data', type: 'error'});
        }else{
          this.notifier({title: 'Error', message: this.$i18n.t('healthIndicatorQuestionnaire.notifications.somethingWentWrong'), type: 'error'});
        }
      });
    },
    deleteData() {
      common.showLoading();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      let url = `/api/countries/${this.$route.params.countryUUID}/delete`;

      axios.delete(url).then(() => {
        this.$router.push({path: `/admin`});
        common.hideLoading();
      }).catch(() => {
        this.notifier({title: 'Error', message: this.$i18n.t('healthIndicatorQuestionnaire.notifications.somethingWentWrong'), type: 'error'});
        common.hideLoading();
      });
    },
    getConfirmationDialog (props) {
      let options = {okText: 'Confirm', cancelText: 'Cancel'};
      return this.$dialog.confirm(props.message, options)
        .then(() => {
          return props.callBackMethod.apply(this, props.callBackArgs);
        });
    },
    expandAllCategories() {
      this.questionnaire.forEach((category) => {
        this.$set(category, 'showCategory', true);
      });
    },
    showValidationError() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.notifier({title: 'Error', message: this.$i18n.t('healthIndicatorQuestionnaire.notifications.correctTheHighlightedFields'), type: 'error'});
    },
    validate(action){
      this.expandAllCategories();
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          if(action == 'submit') {
            this.saveData(action);
          } else {
            this.checkAndPublish();
          }
        } else {
          this.showValidationError();
        }
      });
    },
    checkAndPublish() {
      this.getConfirmationDialog({
        message: this.$i18n.t('healthIndicatorQuestionnaire.publishConfirmation', {country: this.countrySummary.countryName}),
        callBackMethod: this.publish,
        callBackArgs: []
      });
    },
    publish() {
      this.saveData('publish');
    },
    reject() {
      this.getConfirmationDialog({
        message: this.$i18n.t('healthIndicatorQuestionnaire.rejectConfirmation', {country: this.countrySummary.countryName}),
        callBackMethod: this.deleteData,
        callBackArgs: []
      });
    },
    getHealthIndicators() {
      return Object.entries(this.healthIndicators).map((entry) => entry[1]);
    },
    onCategoryExpand(category) {
      category.showCategory = !category.showCategory;
    },
    generatePDF() {
      this.notifier({title: 'Success', message: this.$i18n.t('healthIndicatorQuestionnaire.notifications.download'), type: 'success'});
      generateFormPDF(this.countrySummary, this.questionnaire, this.healthIndicators, this.$i18n);
    }
  },
  template: editForm,
});
