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
        success: false,
        error: false,
        exception:false,
        countries: [],
        countryUUID: "",
        generatedURL:"",
        countryId:"",
        message:""
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
        this.generatedURL='';
        this.message='';
        this.countryId = selectedItem.selectedObject.id;
        this.countryUUID = selectedItem.value;
      },
      generateUrl(){
        this.saveURLGenerationStatus();
        this.generatedURL = location.origin + "/health_indicator_questionnaire/" + this.countryUUID;
      },
      copyUrl() {
        document.getElementById("url-box").select();
        document.execCommand("Copy");
      },

      saveURLGenerationStatus() {
        $('.loading').show();
        let url = "/api/country/url_gen_status/"+this.countryId;
        return axios.post(url, {
          countryId: this.countryId
        }).then((response) => {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          this.message = response.data;
          this.success = true;
          this.error = false;
          this.exception = false;
          $('.loading').hide();
        }).catch(() => {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          this.success = false;
          this.exception = true;
          $('.loading').hide();
        });
      },

    }
});
