import Vue from 'vue'
import map from '@/components/landing-map/map.js'

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(map)
    const mapInstance = new Constructor().$mount()
    console.log('instance', mapInstance)
    // mapInstance.onSearchTriggered()
    // expect(mapInstance.onSearchTriggered())
    //   .to.equal('new map loading')
  })
})
