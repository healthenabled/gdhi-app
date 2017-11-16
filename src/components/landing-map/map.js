import L from 'leaflet'
import countriesData from '../../assets/countries_geo.json'
import mapTemplate from './map.html'
import { EventBus } from '../common/event-bus'
import indicatorPanel from '../indicatorPanel/indicator-panel.js'
import mapLegend from '../legend/legend.js'
// import axios from 'axios'
// import colors from '../common/color-codes.js'
// import _ from 'lodash'

export default {
  components: {
    L, indicatorPanel, mapLegend
  },
  template: mapTemplate,
  data () {
    this.mapData = {
      globalHealthIndices: [],
      lastSelectedCountry: ''
    }
    return this.mapData
  },
  mounted: function () {
    this.drawMap()
    var self = this
    EventBus.$on('countrySearched', function (countryCode) {
      var searchCountry = self.countryLayers.filter(function (layer) {
        return layer.feature.properties.BRK_A3 === countryCode
      })
      console.log('Searching', searchCountry[0])
      searchCountry[0].setStyle({'fillColor': '#CF0A01'})
    })
  },
  methods: {
    drawMap: function () {
      this.countryLayers = []
      this.map = L.map('map').setView([44, -31], 2)
      var self = this
      /* L.TopoJSON = L.GeoJSON.extend({
        addData: function (jsonData) {
          if (jsonData.type === 'Topology') {
            for (var key in jsonData.objects) {
              var geojson = T.feature(jsonData, jsonData.objects[key])
              L.GeoJSON.prototype.addData.call(this, geojson)
            }
          } else {
            L.GeoJSON.prototype.addData.call(this, jsonData)
          }
        }
      })
      const topoLayer = new L.TopoJSON()

      $.getJSON(countriesData)
        .done(addTopoData)

      function addTopoData (topoData) {
        topoLayer.addData(topoData)
        topoLayer.addTo(this.map)
      } */
      this.geoLayer = L.geoJson(countriesData, {
        style: function (feature) {
          console.log('in feature')
          return {
            'weight': 1,
            'color': '#000',
            'fillColor': '#77B2BF',
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
              e.target.setStyle({
                weight: 1,
                color: 'red'
              })
//                e.target.bindTooltip(feature.properties.name)
            },
            'mouseout': function (e) {
              e.target.setStyle({
                weight: 1,
                color: 'black'
              })
            },
            'click': function (e) {
              // self.map.fitBounds(e.target.getBounds())
              e.target.setStyle({
                fillColor: ''
              })
            }
          })
        }
      }).addTo(this.map)
      this.geoLayer.eachLayer(function (layer) {
        layer._path.id = layer.feature.properties.POSTAL
      })
    }
  }
}

// <style>
// @import "~leaflet/dist/leaflet.css";
//
// #map {
//   position: relative;
//   height: calc(100vh - 130px);
//   width: 100%;
//   background: #f2f2e5;
// }
// </style>
