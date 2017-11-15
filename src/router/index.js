import Vue from 'vue'
import Router from 'vue-router'
import content from '@/components/container/container.js'
import mapComponent from '@/components/map/map.js'
import indicatorsInfoComp from '@/components/indicatorsInfo/indicators-info.js'
import headerComp from '@/components/header/header.js'
import footerComp from '@/components/footer/footer.vue'
import countryProfile from '@/components/countryProfile/country-profile.js'
import methodologyComp from '@/components/methodology/methodology.vue'

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
          component: mapComponent,
          children: [
            {
              path: ':foo'
            }
          ]
        },
        {
          path: 'countryProfile/:countryCode',
          component: countryProfile
        },
        {
          path: '/indicatorsInfo',
          component: indicatorsInfoComp
        },
        {
          path: '/methodology',
          component: methodologyComp
        }
      ]
    }
  ]
})
