import Vue from "vue";
import adminViewFormDetails from './admin-view-form-details.html';

export default Vue.extend({
  name:'AdminViewFormDetails',
  data() {
    return {
      selectedTab: 0,
      tabContent: {},
      urlGeneratedInfo: { message: 'url Generated'},
      reviewPendingDetails: { message: 'review pending'},
      publishedData: { message: 'published data'},
      tabs: [
        {id: 0, name:'URL Generated'},
        {id: 1, name:'Awaiting Approval'},
        {id: 2, name:'Published Data'}
        ]
    };
  },
  mounted(){
    this.tabContent = this.urlGeneratedInfo;
  },
  methods: {
    updateSelected (tab) {
      this.selectedTab = tab.id;
      this.tabContent = this.getTabData(tab);
    },
    getTabData(tab){
      switch(tab){
        case this.tabs[0]:
          return this.urlGeneratedInfo;
        case this.tabs[1]:
          return this.reviewPendingDetails;
        case this.tabs[2]:
          return this.publishedData;
        default:
          return {};
      }
    }
  },
  template: adminViewFormDetails,
});




