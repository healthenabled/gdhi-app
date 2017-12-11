import Vue from 'vue'
import L from 'leaflet'
import countriesData from '../../assets/GBR.geo.json'
import thumbnailMap from './thumbnail-map.html'

export default Vue.extend({
  template: thumbnailMap,
  mounted () {
    this.map = L.map('thumbnail-map').setView([44, -31])
    // this.map.fitWorld()
    // var self = this
    var layers = L.geoJson(countriesData, {
      style: function (feature) {
        console.log('in feature')

        return {
          'weight': 1,
          'color': '#000',
          'fillColor': '#387886',
          'fillOpacity': 0.95,
          'id': feature.id
        }
      }
    })
    // function showCountryFor (feature) {
    //   if (feature.properties.BRK_A3 === 'FRA') {
    //     return true
    //   }
    // }

    layers.addTo(this.map)
    this.map.fitBounds(layers.getBounds(), {'minZoom': 7})
  }
})
