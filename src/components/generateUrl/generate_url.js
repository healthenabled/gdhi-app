import Vue from "vue";
import generateUrlTemplate from "./generate_url.html";
import Autocomplete from "vuejs-auto-complete";
import axios from "axios";
import {sortBy} from "lodash";

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
        this.warningMessage='';
        this.countryId = selectedItem.selectedObject.id;
        this.countryUUID = selectedItem.value;
        this.disableGenerateBtn = false
      },
      onClearCountry () {
        this.generatedURL='';
        this.message='';
        this.warningMessage='';
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
        let url = "/api/countries/" + this.countryUUID + "/url_gen_status";
        return axios.post(url, {
          countryId: this.countryId
        }).then((response) => {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          if(response.data.success) {
            this.message = "URL Generated Successfully";
            if(response.data.existingStatus == "PUBLISHED") {
              this.warningMessage = "Country Data is already published";
            }
            this.$notify({
              group: 'custom-template',
              title: 'Success',
              text: this.message,
              type: 'success'
            });
          } else {
            if(response.data.existingStatus == "NEW" || response.data.existingStatus == "DRAFT") {
              this.warningMessage = "URL Not Generated as Country Representative is in the process of submitting data";
            } else {
              this.warningMessage = "URL Not Generated as Country data is pending review";
            }
          }
          const infoElement = document.querySelector("#info-box");
          infoElement.innerText = this.warningMessage;

          const loadingElement = document.querySelector(".loading");
          if(loadingElement)
            loadingElement.style.display = "none";
        }).catch(() => {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          this.success = false;
          this.message = 'Error While Generating URL for Country';
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
