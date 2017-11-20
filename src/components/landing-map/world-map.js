import L from 'leaflet'
import countriesData from '../../assets/countries_mega.json'
import helper from './map-helper'
import eventHandler from './map-event-handler'
import _ from 'lodash'

export default {
  BLACK_COLOR_CODE: '#000',
  lastClickedCountry: '',
  lastMouseOverCountry: '',
  drawMap: function (healthData, postClickCallBack) {
    this.healthData = healthData
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
        layer.on({
          'mousemove': function (e) {
            eventHandler.onMouseMove(e.target, self.lastMouseOverCountry)
          },
          'mouseout': function (e) {
            eventHandler.onMouseOut(e.target, self.lastMouseOverCountry)
          },
          'click': function (e) {
            self.handleClick(e.target, self.lastClickedCountry, self.healthData, postClickCallBack)
          }
        })
      }
    }).addTo(this.map)
    return this.geoLayer._layers
  },
  handleSearch (countryCode, postSearchCallBack) {
    var searchCountry = _.filter(this.geoLayer._layers, function (layer) {
      return layer.feature.properties.BRK_A3 === countryCode
    })
    console.log('Searching', searchCountry[0])
    this.handleClick(searchCountry[0], this.lastClickedCountry, this.healthData,
      postSearchCallBack)
  },
  handleClick ($el, lastClickedCountry, healthData, postClickCallBack) {
    var clickState = eventHandler.onCountryClick($el, lastClickedCountry, healthData)
    if (clickState === 'CLICK_ON') {
      this.lastClickedCountry = $el
      postClickCallBack({'type': 'COUNTRY',
        'countryCode': $el.feature.properties.BRK_A3,
        'countryName': $el.feature.properties.NAME})
      this.map.fitBounds($el.getBounds())
    } else {
      this.lastClickedCountry = ''
      postClickCallBack({'type': 'GLOBAL'})
      this.map.setView([44, -31], 2)
    }
  }
}
