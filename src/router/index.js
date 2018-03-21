import Vue from 'vue'
import Router from 'vue-router'
import content from '@/components/container/container.js'
import indicatorsInfoComp from '@/components/indicatorsInfo/indicators-info.js'
import headerComp from '@/components/header/header.js'
import autoSearch from '@/components/auto-search/auto-search.js'
import footerComp from '@/components/footer/footer.vue'
import countryProfile from '@/components/countryProfile/country-profile.js'
import landingMap from '@/components/landing-map/map.js'
import methodologyComp from '@/components/methodology/methodology.vue'
import healthIndicatorQuestionnaire from '@/components/health_indicator_questionnaire/health_indicator_questionnaire.js'
import countryListComp from '@/components/countryList/country-list.js'
import errorComp from '@/components/error-handler/404-error.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      components: {
        container: content,
        header: headerComp,
        footer: footerComp
      },
      children: [
        {
          path: 'map',
          components: {
            routecontent: landingMap,
            search: autoSearch
          },
          children: [
            {
              path: ':foo'
            }
          ]
        },
        {
          path: 'countryProfile/:countryCode',
          components: {
            routecontent: countryProfile
          }
        },
        {
          path: '/indicatorsInfo',
          components: {
            routecontent: indicatorsInfoComp
          }
        },
        {
          path: '/methodology',
          components: {
            routecontent: methodologyComp
          }
        },
        {
          path: '/health_indicator_questionnaire',
          components: {
            routecontent: healthIndicatorQuestionnaire
          }
        },
        {
          path: '/health_indicator_questionnaire/:countryCode',
          components: {
            routecontent: healthIndicatorQuestionnaire
          }
        },
        {
          path: '/country_list',
          components: {
            routecontent: countryListComp
          }
        },
        {
          path: '*',
          components: {
            routecontent: errorComp
          }
        }
      ]
    }
  ]
})
