import Vue from 'vue';
import generateUrlTemplate from './generate_url.html';
import Autocomplete from 'vuejs-auto-complete';
import axios from 'axios';

export default Vue.extend({
    template: generateUrlTemplate,
    components: { Autocomplete },
    mounted() {
      this.loadCountries();
      $('.loading').hide();
    },
    data() {
      return { 
        countries: [],
        countryUUID: "",
        generatedURL:""
      };
    },
    methods: {
      loadCountries() {
        return axios.get('/api/countries')
          .then(response => {
            this.countries = response.data;
          });
      },
      onCountrySelect(selectedItem) {
        this.countryUUID = selectedItem.value;
      },
      generateUrl(){
        this.generatedURL = location.origin + "/health_indicator_questionnaire/" + this.countryUUID;
      },
      copyUrl() {
        document.getElementById("url-box").select();
        document.execCommand("Copy");
      },
    }
});
  