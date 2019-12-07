import Vue from 'vue';
import Autocomplete from 'vuejs-auto-complete';
import languageSelect from './language_selector.html';

export default Vue.extend({
  name: 'LanguageSelect',
  components: {Autocomplete},
  data() {
    return {
      languages: [
        {
          id: 'en',
          name: 'English'
        }, {
        //   id: 'ar',
        //   name: 'Arabic'
        // }, {
          id: 'fr',
          name: 'French'
        }, {
          id: 'pt',
          name: 'Portuguese'
        }, {
          id: 'es',
          name: 'Spanish'
        }]
    };
  },
  template: languageSelect,
});

