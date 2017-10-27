<template>


  <div id='map-canvas'>

  </div>

</template>
<script>
  export default {
    mounted: function () {
      setTimeout(this.drawMap, 100)
    },

//    ready () {
//      setTimeout(this.drawMap, 100)
//    },
    methods: {
      drawMap () {
        console.log('map data ******', window.countryData)
        var data = window.countryData
        var map
        var myOptions = {
          zoom: 2,
          center: new google.maps.LatLng(45.4555729, 9.169236),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        // initialize the map
        map = new google.maps.Map(document.getElementById('map-canvas'), myOptions)
//        var allowedBounds = new google.maps.LatLngBounds(
//          new google.maps.LatLng(-95, -180),	// top left corner of map
//          new google.maps.LatLng(85, 180)	// bottom right corner
//        );
//
//        var k = 0.0
//        var n = allowedBounds.getNorthEast().lat() - k
//        var e = allowedBounds.getNorthEast().lng() - k
//        var s = allowedBounds.getSouthWest().lat() + k
//        var w = allowedBounds.getSouthWest().lng() + k
//        var neNew = new google.maps.LatLng(n, e)
//        var swNew = new google.maps.LatLng(s, w)
//        var boundsNew = new google.maps.LatLngBounds(swNew, neNew)
//        map.fitBounds(boundsNew)

        var styles = [
          {
            stylers: [
              { hue: '#00ffe6' },
              { saturation: -20 }
            ]
          },
          {
            featureType: 'landscape',
            stylers: [
              { hue: '#ffff66' },
              { saturation: 100 }
            ]
          }, {
            featureType: 'road',
            stylers: [
              { visibility: 'off' }
            ]
          }, {
            featureType: 'administrative.land_parcel',
            stylers: [
              { visibility: 'off' }
            ]
          }, {
            featureType: 'administrative.locality',
            stylers: [
              { visibility: 'off' }
            ]
          }, {
            featureType: 'administrative.neighborhood',
            stylers: [
              { visibility: 'off' }
            ]
          }, {
            featureType: 'administrative.province',
            stylers: [
              { visibility: 'off' }
            ]
          }, {
            featureType: 'landscape.man_made',
            stylers: [
              { visibility: 'off' }
            ]
          }, {
            featureType: 'landscape.natural',
            stylers: [
              { visibility: 'off' }
            ]
          }, {
            featureType: 'poi',
            stylers: [
              { visibility: 'off' }
            ]
          }, {
            featureType: 'transit',
            stylers: [
              { visibility: 'off' }
            ]
          }
        ]

        map.setOptions({styles: styles})

        var rows = data['rows']
        for (var i in rows) {
          if (rows[i][0] !== 'Antarctica') {
            var newCoordinates = []
            var geometries = rows[i][1]['geometries']
            if (geometries) {
              for (var j in geometries) {
                newCoordinates.push(this.constructNewCoordinates(geometries[j]))
              }
            } else {
              newCoordinates = this.constructNewCoordinates(rows[i][1]['geometry'])
            }
            var country = new google.maps.Polygon({
              paths: newCoordinates,
              strokeColor: '#ff9900',
              strokeOpacity: 1,
              strokeWeight: 0.3,
              fillColor: '#ffff66',
              fillOpacity: 0,
              name: rows[i][0]
            })
            google.maps.event.addListener(country, 'mouseover', function () {
              this.setOptions({fillOpacity: 0.4})
            });
            google.maps.event.addListener(country, 'mouseout', function () {
              this.setOptions({fillOpacity: 0})
            })
            google.maps.event.addListener(country, 'click', function () {
              alert(this.name)
            })

            country.setMap(map)
          }
        }
      },
      constructNewCoordinates (polygon) {
        var newCoordinates = []
        var coordinates = polygon['coordinates'][0]
        for (var i in coordinates) {
          newCoordinates.push(
            new google.maps.LatLng(coordinates[i][1], coordinates[i][0]))
        }
        return newCoordinates
      }
    }
  }
</script>
<style>

  #map-canvas {
    height: 800px;
    width: 100%;
  }

</style>
