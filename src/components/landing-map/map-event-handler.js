import mapHelper from './map-helper.js'

export default {
  onCountryClick: function (layer, lastClickedLayer, countryIndices) {
    var RED_COLOR_CODE = '#CF0A01'
    var RESET_CLICK = 'RESET_CLICK'
    var CLICK_ON = 'CLICK_ON'
    var COUNTRY_NOT_FOUND = 'COUNTRY_NOT_FOUND'
    if (lastClickedLayer !== '') {
      this.resetLayer(lastClickedLayer, countryIndices)
      // lastClickedLayer.setStyle({
      //   'fillOpacity': 0.95,
      //   'fillColor': mapHelper.getColorCodeOf(lastClickedLayer.feature.properties.BRK_A3,
      //     countryIndices)
      // })
    }
    if (layer) {
      if (lastClickedLayer && lastClickedLayer.feature.properties.BRK_A3 ===
        layer.feature.properties.BRK_A3) {
        return RESET_CLICK
      }
      layer.setStyle({'fillColor': RED_COLOR_CODE, 'fillOpacity': 0.95})
      return CLICK_ON
    } else {
      return COUNTRY_NOT_FOUND
    }
  },

  onMouseMove: function (layer, lastMouseOverCountry) {
    layer.setStyle({'fillOpacity': 0.65})
  },
  onMouseOut: function (layer, lastMouseOverCountry) {
    layer.setStyle({'fillOpacity': 0.95})
  },
  resetLayer: function (layer, countryIndices) {
    if (layer) {
      layer.setStyle({
        'fillOpacity': 0.95,
        'fillColor': mapHelper.getColorCodeOf(layer.feature.properties.BRK_A3,
          countryIndices)
      })
    }
  }
}
