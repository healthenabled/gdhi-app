import Vue from "vue";
import adminViewFormDetails from './admin-view-form-details.html';
import adminTable from '../displayTable/admin-table.js';
import axios from "axios";

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
        {id: 1, name:'Review Pending'},
        {id: 2, name:'Live Data'}
        ]
    };
  },
   mounted(){
     this.loadAdminViewFormDetails();
  },
  methods: {
    updateSelected (tab) {
      this.getTabData(tab);
      this.selectedTab = tab.id;
    },
    loadAdminViewFormDetails() {
      axios.get('/api/admin/view_form_details')
        .then(response => {
          this.allData = response.data;
          this.updateSelected(this.tabs[0]);
        }).catch((e) => {
          console.log("Error");
        });
    },
    actionHandler(action, countryUUID){

      if(action === 'Review'){
        this.openUrl(location.origin + "/health_indicator_questionnaire/" + countryUUID +"/review");
      }
      else if(action === 'View Live Data'){
        this.openUrl(location.origin + "/health_indicator_questionnaire/viewPublish/" + countryUUID );
      }
    },
    openUrl(url) {
      window.open(url);
    },
    wrapperOnTableRows(rows) {
      rows.forEach(function(row,index) {
        row.url = location.origin + "/health_indicator_questionnaire/" + row.countryUUID;
      })
    },
    getTabData(tab){
      if(this.allData == undefined) return;
      switch(tab){
        case this.tabs[0]:
           this.tableColumns = [
             {propName: 'countryName' , displayName: 'Country'},
             {propName: 'status' , displayName: 'Status'},
             ];

           this.tableRows = [];
           if(this.allData.NEW != undefined)this.tableRows = [...this.tableRows , ...this.allData.NEW];
           if(this.allData.DRAFT != undefined)this.tableRows = [...this.tableRows , ...this.allData.DRAFT];
           this.wrapperOnTableRows(this.tableRows);
           this.action='View Data';
          break;
        case this.tabs[1]:
          this.tableColumns = [
            {propName: 'countryName' , displayName: 'Country'},
            {propName: 'contactName' , displayName: 'Country Contact Name'} ,
            {propName: 'contactEmail' , displayName: 'Country Contact Email'}
            ];
          this.action='Review';
          this.tableRows = [];
          if(this.allData.REVIEW_PENDING!= undefined){this.tableRows = this.allData.REVIEW_PENDING;}
          break;
        case this.tabs[2]:
          this.tableColumns = [
            {propName: 'countryName' , displayName: 'Country'},
            {propName: 'contactName' , displayName: 'Country Contact Name'} ,
            {propName: 'contactEmail' , displayName: 'Country Contact Email'}
            ];
          this.action='View Live Data';
          this.tableRows = [];
          if(this.allData.PUBLISHED!= undefined){this.tableRows = this.allData.PUBLISHED;}
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




