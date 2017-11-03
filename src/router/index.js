import Vue from 'vue'
import Router from 'vue-router'
import content from '@/components/container/container.js'
import mapComponent from '@/components/map/map.js'
import headerComp from '@/components/header/header.vue'
import footerComp from '@/components/footer/footer.vue'
Vue.use(Router)

export default new Router({
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
          path: 'countryProfile',
          component: footerComp
        },
        {
          path: '/allIndicators',
          component: footerComp
        }
      ]
    }
  ]
})
