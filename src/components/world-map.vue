<template>


  <div id="map">

  </div>

</template>
<script>
  import L from 'leaflet'
//  import countriesData from '../assets/countries_today.geo.json'
//  import countriesData from '../assets/countries1.geo.json'

  export default {
    components: {
      L
    },
    mounted: function () {
      this.drawMap()
    },
    methods: {
      drawMap: function () {
        var maxBounds = L.latLngBounds(
          L.latLng(-95, -172),
          L.latLng(85, 193))
        this.map = L.map('map', {
          'center': [0, 0],
          'zoom': 1,
          'layers': [
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              'attribution': 'Map data &copy; OpenStreetMap contributors'
            })
          ]
        })
        this.map.setView([48.7385, -0.5588], 2)
        this.map.setMaxBounds(maxBounds)
        this.map.fitBounds(maxBounds)
//        this.map = L.map('map').setView([48.7385, -0.5588], 2)
//        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//        }).addTo(this.map)
        L.geoJson(countriesData, {
          style: function (feature) {
            console.log('in feature')
            return {
              'weight': 1,
              'color': 'black',
              'fillColor': 'yellow'
            }
          },
          onEachFeature: function (feature, layer) {
            layer.on({
              'mousemove': function (e) {
                e.target.setStyle({
                  weight: 7,
                  color: 'red'
                })
              },
              'mouseout': function (e) {
                e.target.setStyle({
                  weight: 1,
                  color: 'black'
                })
              },
              'click': function (e) {
                e.target.setStyle({
                  fillColor: 'blue'
                })
              }
            })
          }
        }).addTo(this.map)
//        this.map.removeLayer(tileLayer)
      }
    }
  }
</script>
<style>
  @import "~leaflet/dist/leaflet.css";

  #map {
    position: absolute;
    float: left;
    top: 1%;
    height: 98%;
    width: 100%;
    z-index: 1;

  }
</style>
