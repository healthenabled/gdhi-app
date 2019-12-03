import Vue from 'vue';
import VueI18n from 'vue-i18n';
import {en, es} from '../static-content/index';

Vue.use(VueI18n);
const messages = {
  en,
  es
};

const english = 'en';
const i18n = new VueI18n({
  locale: english,
  fallbackLocale: english,
  messages,
});

export default i18n;
