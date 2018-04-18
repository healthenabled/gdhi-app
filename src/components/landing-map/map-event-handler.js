import mapHelper from './map-helper.js';

export default {
  onCountryClick(layer, lastClickedLayer, countryIndices) {
    const RED_COLOR_CODE = '#CF0A01';
    const RESET_CLICK = 'RESET_CLICK';
    const CLICK_ON = 'CLICK_ON';
    const COUNTRY_NOT_FOUND = 'COUNTRY_NOT_FOUND';
    if (lastClickedLayer !== '') {
      this.resetLayer(lastClickedLayer, countryIndices);
    }
    if (layer) {
      if (lastClickedLayer && lastClickedLayer.feature.properties.BRK_A3 ===
        layer.feature.properties.BRK_A3) {
        return RESET_CLICK;
      }
      layer.setStyle({ fillColor: RED_COLOR_CODE, fillOpacity: 0.95 });
      return CLICK_ON;
    }
    return COUNTRY_NOT_FOUND;
  },

  onMouseMove(layer, lastMouseOverCountry) {
    layer.setStyle({ fillOpacity: 0.65 });
  },
  onMouseOut(layer, lastMouseOverCountry) {
    layer.setStyle({ fillOpacity: 0.95 });
  },
  resetLayer(layer, countryIndices) {
    if (layer) {
      layer.setStyle({
        fillOpacity: 0.95,
        fillColor: mapHelper.getColorCodeOf(
          layer.feature.properties.BRK_A3,
          countryIndices,
        ),
      });
    }
  },
};
