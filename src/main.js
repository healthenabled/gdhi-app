// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import Notifications from 'vue-notification';
import App from './App';
import router from './router';
// noinspection ES6UnusedImports
import {} from './global.js';
import {i18n} from './plugins/i18n';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);
VueCookies.config('7d');

Vue.config.productionTip = false;

Vue.use(Notifications);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: {App, Notifications},
  mounted() {
    if (this.$route.fullPath.length <= 1) {
      this.$router.push('map');
    }
  },
  template: '<App/>',
});
