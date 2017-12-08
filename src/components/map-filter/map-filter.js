import Vue from 'vue'
import mapFilter from './map-filter'
import mapComp from '../landing-map/map.js'
import indicators from '../indicatorPanel/indicator-panel.js'

export default Vue.extend({
  template: mapFilter,
  components: {indicators, mapComp}
})
