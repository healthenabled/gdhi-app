import L from 'leaflet'
import countriesData from '../../assets/countries_lakes.json'
import helper from './map-helper'
import eventHandler from './map-event-handler'
import _ from 'lodash'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.imagePath = ''
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../../assets/img/marker-icon-2x.png'),
  iconUrl: require('../../assets/img/marker-icon.png'),
  shadowUrl: require('../../assets/img/marker-shadow.png')
})
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
    this.map = L.map('map', {attributionControl: false}).setView([44, -31], 0)
    // this.map.setMinZoom(2)
    L.control.attribution({position: 'bottomleft'}).addTo(this.map)
    // this.map.fitWorld()
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
        // if (feature.properties) {
        //   var popupString = '<div class="popup">'
        //   popupString += feature.properties.NAME_LONG
        //   popupString += '</div>'
        //   layer.bindTooltip(popupString, {permanent: true, direction: 'center', className: 'countryLabel'})
        // }
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
        'countryName': $el.feature.properties.NAME_LONG})
      console.log('boundary', $el)
      // this.map.panTo(new L.LatLng(e.latlng.lat, e.latlng.lng))
      // this.map.setView([e.latlng.lat, e.latlng.lng])
      console.log('Center', $el.getBounds().getCenter())
      this.map.fitBounds($el.getBounds(), {'maxZoom': 5})
      $el.bindTooltip($el.feature.properties.NAME_LONG,
        {permanent: true, direction: 'center', className: 'countryLabel'})
      var pointXY = L.point(-101.1, 38.1)
      console.log('LatLng', this.map.layerPointToLatLng(pointXY))
      // L.marker(this.map.layerPointToLatLng(pointXY)).addTo(this.map)
      // L.marker([$el.getCenter().lat, $el.getCenter().lng]
      // ).addTo(this.map)
      // this.map.panTo(new L.LatLng(e.latlng.lat, e.latlng.lng))
      // TODO: Hacky fix
      $('#search-box').val($el.feature.properties.NAME_LONG)
    } else if (clickState === 'RESET_CLICK') {
      this.lastClickedCountry = ''
      postClickCallBack({'type': 'GLOBAL'})
      this.map.setView([44, -31], 2)
      // TODO: Hacky fix
      $('#search-box').val('')
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
    // TODO: Hacky fix
    $('#search-box').val('')
  }
}
