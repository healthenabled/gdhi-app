import Vue from 'vue';
import errorTemplate from './error.html';

export default Vue.extend({
  template: errorTemplate,
  data() {
    return {
      errorMessage: 'Page Not Found!.',
    };
  },
  mounted() {
    const loadingElement = document.querySelector(".loading");
    if(loadingElement)
      loadingElement.style.display = "none";
  },
});
