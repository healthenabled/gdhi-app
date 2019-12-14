import Vue from 'vue';
import Autocomplete from 'vuejs-auto-complete';
import languageSelect from './language_selector.html';

export default Vue.extend({
  name: 'LanguageSelect',
  components: {Autocomplete},
  mounted() {
    if (this.$cookies.isKey('user_language')) {
      this.$i18n.locale = this.$cookies.get('user_language');
    }
  },
  updated() {
    this.$cookies.set('user_language', this.$i18n.locale);
  },
  data() {
    return {
      languages: [
        {
          id: 'en',
          name: 'English'
        }, {
          id: 'ar',
          name: 'عربى'
        }, {
          id: 'fr',
          name: 'Français'
        }, {
          id: 'pt',
          name: 'Português'
        }, {
          id: 'es',
          name: 'Español'
        }]
    };
  },
  template: languageSelect,
});

