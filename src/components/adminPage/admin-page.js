import Vue from 'vue';
import adminPage from './admin-page.html';
import GenerateUrl from '../generateUrl/generate_url.js';
import AdminViewFormDetails from '../adminViewFormDetails/admin-view-form-details.js';


export default Vue.extend({
  name:'AdminPage',
  components: { GenerateUrl, AdminViewFormDetails },
  template: adminPage
});
