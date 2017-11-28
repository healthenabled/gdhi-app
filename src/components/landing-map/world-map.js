import L from 'leaflet'
import countriesData from '../../assets/countries_mega.json'
import helper from './map-helper'
import eventHandler from './map-event-handler'
import _ from 'lodash'

export default {
  BLACK_COLOR_CODE: '#000',
  WHITE_COLOR_CODE: '#fff',
  lastClickedCountry: '',
  lastMouseOverCountry: '',
  drawMap: function (healthData, postClickCallBack) {
    this.healthData = healthData
    var self = this
    var ResetButton = L.Control.extend({
      options: {
        position: 'topleft'
      },
      onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control ' +
          'leaflet-control-custom')
        container.type = 'button'
        container.title = 'Reset Map Selections'
        container.id = 'reset-btn'
        container.onclick = function () {
          self.resetMap(postClickCallBack)
        }

        return container
      }
    })
    this.map = L.map('map', {attributionControl: false}).setView([44, -31], 2)
    L.control.attribution({position: 'bottomleft'}).addTo(this.map)
    this.map.addControl(new ResetButton())
    this.geoLayer = L.geoJson(countriesData, {
      style: function (feature) {
        console.log('in feature')
        let fillColorCode = helper.getColorCodeOf(feature.properties.BRK_A3,
          healthData)
        return {
          'weight': 1,
          'color': self.WHITE_COLOR_CODE,
          'fillColor': fillColorCode,
          'fillOpacity': 0.95,
          'id': feature.id
        }
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties) {
          var popupString = '<div class="popup">'
          popupString += feature.properties.NAME_LONG
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
            self.handleClick(e.target, feature.properties.BRK_A3, self.lastClickedCountry, self.healthData, postClickCallBack)
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
    this.handleClick(searchCountry[0], countryCode, this.lastClickedCountry, this.healthData,
      postSearchCallBack)
  },
  handleClick ($el, countryCode, lastClickedCountry, healthData, postClickCallBack) {
    var clickState = eventHandler.onCountryClick($el, lastClickedCountry, healthData)
    if (clickState === 'CLICK_ON') {
      this.lastClickedCountry = $el
      postClickCallBack({'type': 'COUNTRY',
        'countryCode': $el.feature.properties.BRK_A3,
        'countryName': $el.feature.properties.NAME})
      this.map.fitBounds($el.getBounds(), {'maxZoom': 7})
      // $('#search-box').val($el.feature.properties.NAME)
    } else if (clickState === 'RESET_CLICK') {
      this.lastClickedCountry = ''
      postClickCallBack({'type': 'GLOBAL'})
      this.map.setView([44, -31], 2)
      // $('#search-box').val('')
    } else {
      this.lastClickedCountry = ''
      postClickCallBack({'type': 'COUNTRY',
        'countryCode': countryCode,
        'countryName': ''})
      this.map.setView([44, -31], 2)
    }
  },
  resetMap (postClickCallBack) {
    eventHandler.resetLayer(this.lastClickedCountry, this.healthData)
    this.lastClickedCountry = ''
    postClickCallBack({'type': 'GLOBAL'})
    this.map.setView([44, -31], 2)
  }
}
