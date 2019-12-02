import Vue from 'vue';
import Autocomplete from 'vuejs-auto-complete'
import languageSelect from './language_selector.html';

export default Vue.extend({
  name: 'LanguageSelect',
  components: {Autocomplete},
  data() {
    return {languages: [{name: "English"}, {name: "Arabic"}, {name: "French"}, {name: "Portuguese"}, {name: "Spanish"}]};
  },
  template: languageSelect,
});

