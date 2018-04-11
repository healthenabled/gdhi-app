import Vue from 'vue';
import adminPage from './admin-page.html';
import generateUrl from '../generateUrl/generate_url.js';
import adminViewFormDetails from '../adminViewFormDetails/admin-view-form-details.js';


export default Vue.extend({
  name:'AdminPage',
  components: { generateUrl, adminViewFormDetails },
  data() {
    return {};
  },
  mounted(){
  },
  methods: {
  },
  template: adminPage
});
