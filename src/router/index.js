import Vue from 'vue';
import Router from 'vue-router';
import content from '@/components/container/container.js';
import indicatorsInfoComp from '@/components/indicatorsInfo/indicators-info.js';
import headerComp from '@/components/header/header.js';
import autoSearch from '@/components/auto-search/auto-search.js';
import footerComp from '@/components/footer/footer.vue';
import countryProfile from '@/components/countryProfile/country-profile.js';
import landingMap from '@/components/landing-map/map.js';
import methodologyComp from '@/components/methodology/methodology.vue';
import healthIndicatorQuestionnaire from '@/components/healthIndicatorQuestionnaire/health_indicator_questionnaire.js';
import countryListComp from '@/components/countryList/country-list.js';
import ErrorComp from '@/components/error-handler/404-error.js';
import adminPageComp from '@/components/adminPage/admin-page.js';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      components: {
        container: content,
        header: headerComp,
        footer: footerComp,
      },
      children: [
        {
          path: '/',
          redirect: "/map"
        },
        {
          path: 'map',
          components: {
            routecontent: landingMap,
            search: autoSearch,
          },
          children: [
            {
              path: ':foo',
            },
          ],
        },
        {
          path: 'country_profile/:countryCode',
          components: {
            routecontent: countryProfile,
          },
        },
        {
          path: '/indicators_info',
          components: {
            routecontent: indicatorsInfoComp,
          },
        },
        {
          path: '/methodology',
          components: {
            routecontent: methodologyComp,
          },
        },
        {
          path: '/health_indicator_questionnaire/:countryUUID',
          components: {
            routecontent: healthIndicatorQuestionnaire,
          },
        },
        {
          path: '/admin',
          components: {
            routecontent: adminPageComp,
          },
        },
        {
          path: '/country_list',
          components: {
            routecontent: countryListComp,
          },
        },
        {
          path: '/health_indicator_questionnaire/:countryUUID/review',
          components: {
            routecontent: healthIndicatorQuestionnaire,
          },
        },
        {
          path: '/health_indicator_questionnaire/viewPublish/:countryUUID',
          components: {
            routecontent: healthIndicatorQuestionnaire,
          },
        },
        {
          path: '*',
          components: {
            routecontent: ErrorComp,
          },
        },
      ],
    },
  ],
});
