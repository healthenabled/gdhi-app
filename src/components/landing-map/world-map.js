import L from 'leaflet'
import countriesData from '../../assets/countries_mega.json'
import helper from './map-helper'
import eventHandler from './map-event-handler'

export default {
  RED_COLOR_CODE: '#CF0A01',
  BLACK_COLOR_CODE: '#000',
  lastClickedCountry: '',
  lastMouseOverCountry: '',
  drawMap: function (healthData, postClickCallBack) {
    this.healthData = healthData
    this.countryLayers = []
    this.map = L.map('map').setView([44, -31], 2)
    var self = this
    this.geoLayer = L.geoJson(countriesData, {
      style: function (feature) {
        console.log('in feature')
        let fillColorCode = helper.getColorCodeOf(feature.properties.BRK_A3,
          healthData)
        return {
          'weight': 1,
          'color': self.BLACK_COLOR_CODE,
          'fillColor': fillColorCode,
          'fillOpacity': 0.95,
          'id': feature.id
        }
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties) {
          var popupString = '<div class="popup">'
          popupString += feature.properties.NAME
          popupString += '</div>'
          layer.bindTooltip(popupString)
        }
        self.countryLayers.push(layer)
        layer.on({
          'mousemove': function (e) {
            eventHandler.onMouseMove(e.target, self.lastMouseOverCountry)
          },
          'mouseout': function (e) {
            eventHandler.onMouseOut(e.target, self.lastMouseOverCountry)
          },
          'click': function (e) {
            var clickState = eventHandler.onCountryClick(e.target, self.lastClickedCountry, self.healthData)
            if (clickState === 'CLICK_ON') {
              self.lastClickedCountry = e.target
              postClickCallBack({'type': 'COUNTRY',
                'countryCode': e.target.feature.properties.BRK_A3,
                'countryName': e.target.feature.properties.NAME})
            } else {
              self.lastClickedCountry = ''
              postClickCallBack({'type': 'GLOBAL'})
            }
          }
        })
      }
    }).addTo(this.map)
  }
}
