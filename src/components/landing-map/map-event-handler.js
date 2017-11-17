import mapHelper from './map-helper.js'

export default {
  onCountryClick: function (layer, lastClickedLayer, countryIndices) {
    var RED_COLOR_CODE = '#CF0A01'
    var RESET_CLICK = 'RESET_CLICK'
    var CLICK_ON = 'CLICK_ON'
    if (lastClickedLayer !== '') {
      lastClickedLayer.setStyle({
        'fillOpacity': 0.95,
        'fillColor': mapHelper.getColorCodeOf(lastClickedLayer.feature.properties.BRK_A3,
          countryIndices)
      })
    }
    if (lastClickedLayer && lastClickedLayer.feature.properties.BRK_A3 ===
      layer.feature.properties.BRK_A3) {
      return RESET_CLICK
    }
    layer.setStyle({'fillColor': RED_COLOR_CODE, 'fillOpacity': 0.95})
    return CLICK_ON
  },

  onMouseMove: function (layer, lastMouseOverCountry) {
    layer.setStyle({'fillOpacity': 0.65})
  },
  onMouseOut: function (layer, lastMouseOverCountry) {
    layer.setStyle({'fillOpacity': 0.95})
  }
}
