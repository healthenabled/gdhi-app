import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import map from '@/components/world-map'
// import map from '@/components/world-map-plugin'
import map from '@/components/google-world'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: map
    }
  ]
})
