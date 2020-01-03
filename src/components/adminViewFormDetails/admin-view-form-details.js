import Vue from "vue";
import adminViewFormDetails from './admin-view-form-details.html';
import AdminTable from '../displayTable/admin-table.js';
import axios from "axios";
import { isEmpty } from 'lodash';

export default Vue.extend({
  name:'AdminViewFormDetails',
  components: { AdminTable },
  data() {
    return {
      selectedTab: 0,
      tableColumns: [],
      tableRows: [],
      allData: {},
      action:'',
      noRecordsMessage: '',
      error: '',
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
      axios.get('/api/countries/country_status_summaries')
        .then(response => {
          this.allData = response.data;
          this.updateSelected(this.tabs[0]);
        }).catch((e) => {
          this.error = e.response.message;
        });
    },
    actionHandler(action, countryUUID){

      if(action === 'Review'){
        this.openUrl(location.origin + "/admin/health_indicator_questionnaire/" + countryUUID +"/review");
      }
      else if(action === 'View Live Data'){
        this.openUrl(location.origin + "/admin/health_indicator_questionnaire/" + countryUUID +"/viewPublished");
      }
    },
    openUrl(url) {
      window.open(url);
    },
    wrapperOnTableRows(rows) {
      rows.forEach(function(row) {
        row.url = location.origin + "/health_indicator_questionnaire/" + row.countryUUID;
      })
    },
    getTabData(tab){
      this.tableColumns= [];
      this.tableRows = [];
      this.noRecordsMessage = '';
      if(isEmpty(this.allData)) {
        this.noRecordsMessage = 'No Records Found';
        return;
      }
      switch(tab){
        case this.tabs[0]:
           this.tableColumns = [
             {propName: 'countryName' , displayName: 'Country'},
             {propName: 'status' , displayName: 'Status'},
             ];

           this.tableRows = [];
           if(this.allData.NEW !== undefined)this.tableRows = [...this.tableRows , ...this.allData.NEW];
           if(this.allData.DRAFT !== undefined)this.tableRows = [...this.tableRows , ...this.allData.DRAFT];
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
          if(this.allData.REVIEW_PENDING !== undefined){this.tableRows = this.allData.REVIEW_PENDING;}
          break;
        case this.tabs[2]:
          this.tableColumns = [
            {propName: 'countryName' , displayName: 'Country'},
            {propName: 'contactName' , displayName: 'Country Contact Name'} ,
            {propName: 'contactEmail' , displayName: 'Country Contact Email'}
            ];
          this.action='View Live Data';
          this.tableRows = [];
          if(this.allData.PUBLISHED !== undefined){this.tableRows = this.allData.PUBLISHED;}
          break;
      }
      if (this.tableRows.length <= 0) {
        this.noRecordsMessage = 'No Records Found';
      }
    }
  },
  template: adminViewFormDetails,
});




