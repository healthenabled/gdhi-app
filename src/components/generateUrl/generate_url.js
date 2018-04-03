import Vue from 'vue';
import generateUrlTemplate from './generate_url.html';
import Autocomplete from 'vuejs-auto-complete';
import axios from 'axios';
import { sortBy } from 'lodash';

export default Vue.extend({
    template: generateUrlTemplate,
    components: { Autocomplete },
    mounted() {
      this.loadCountries();
      const loadingElement = document.querySelector(".loading");
      if(loadingElement)
        loadingElement.style.display = "none";
    },
    data() {
      return {
        success: false,
        error: false,
        disableGenerateBtn: true,
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
            this.countries = sortBy(response.data, ["name"]);
          });
      },
      onCountrySelect(selectedItem) {
        this.generatedURL='';
        this.message='';
        this.countryId = selectedItem.selectedObject.id;
        this.countryUUID = selectedItem.value;
        this.disableGenerateBtn = false
      },
      onClearCountry () {
        this.generatedURL='';
        this.message='';
        this.countryId = '';
        this.countryUUID = '';
        this.disableGenerateBtn = true
      },
      generateUrl(){
        this.saveURLGenerationStatus();
        this.generatedURL = location.origin + "/health_indicator_questionnaire/" + this.countryUUID;
      },
      copyUrl() {
        document.getElementById("url-box").select();
        document.execCommand("Copy");
        this.$notify({
          group: 'custom-template',
          title: 'Information',
          text: 'URL Copied Successfully',
          type: 'warn'
        });
      },

      saveURLGenerationStatus() {
        const loadingElement = document.querySelector(".loading");
        if(loadingElement)
          loadingElement.style.display = "block";
        let url = "/api/country/"+this.countryId+"/url_gen_status";
        return axios.post(url, {
          countryId: this.countryId
        }).then((response) => {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          this.message = response.data.msg;
          this.$notify({
            group: 'custom-template',
            title: 'Success',
            text: this.message ,
            type: 'success'
          });
          const loadingElement = document.querySelector(".loading");
          if(loadingElement)
            loadingElement.style.display = "none";
        }).catch(() => {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          this.success = false;
          this.message = 'Error While Saving the URL Generation Status';
          this.$notify({
            group: 'custom-template',
            title: 'Error',
            text: this.message,
            type: 'error'
          });
          const loadingElement = document.querySelector(".loading");
          if(loadingElement)
            loadingElement.style.display = "none";
        });
      },

    }
});
