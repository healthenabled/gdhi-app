import Vue from "vue";
import adminViewFormDetails from './admin-view-form-details.html';
import adminTable from '../displayTable/admin-table.js';
import axios from "axios/index";

export default Vue.extend({
  name:'AdminViewFormDetails',
  components: { adminTable },
  data() {
    return {
      selectedTab: 0,
      tableColumns: [],
      tableRows: [],
      allData: [],
      action:'',
      tabs: [
        {id: 0, name:'Awaiting Submission'},
        {id: 1, name:'Awaiting Approval'},
        {id: 2, name:'Live Data'}
        ]
    };
  },
   mounted(){
     this.loadAdminViewFormDetails();
  },
  methods: {
    updateSelected (tab) {
      this.selectedTab = tab.id;
      this.getTabData(tab);
    },
    loadAdminViewFormDetails() {
      return axios.get('/api/admin/view_form_details')
        .then(response => {
          this.allData = response.data;
          this.updateSelected(this.tabs[0]);
        });
    },
    actionHandler(action, countryUUID){
      if(action === 'View Data'){
        this.openUrl(location.origin + "/health_indicator_questionnaire/" + countryUUID);
      }
      else if(action === 'Review'){
        this.openUrl(location.origin + "/health_indicator_questionnaire/" + countryUUID +"/review");
      }
    },
    openUrl(url) {
      window.open(url);
    },
    getTabData(tab){
      switch(tab){
        case this.tabs[0]:
           this.tableColumns = [
             {propName: 'countryName' , displayName: 'Country'},
             {propName: 'status' , displayName: 'Form Status'},
             ];
          this.tableRows = [...this.allData.NEW, ...this.allData.DRAFT];
          this.action='View Data';
          break;
        case this.tabs[1]:
          this.tableColumns = [
            {propName: 'countryName' , displayName: 'Country'},
            {propName: 'contactName' , displayName: 'Contact Name'} ,
            {propName: 'contactEmail' , displayName: 'Contact Email'}
            ];
          this.action='Review';
          this.tableRows = this.allData.REVIEW_PENDING;
          break;
        case this.tabs[2]:
          this.tableColumns = [
            {propName: 'countryName' , displayName: 'Country'},
            {propName: 'contactName' , displayName: 'Contact Name'} ,
            {propName: 'contactEmail' , displayName: 'Contact Email'}
            ];
          this.action='View Live Data';
          this.tableRows = this.allData.PUBLISHED;
          break;
        default:
          this.tableColumns= [];
          this.tableRows = [];
          break;
      }
    }
  },
  template: adminViewFormDetails,
});




