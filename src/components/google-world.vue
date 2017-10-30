<template>


  <div id='map-canvas'>

  </div>

</template>
<script>
  export default {
    mounted: function () {
      setTimeout(this.drawMap, 100)
    },
    methods: {
      drawMap () {
        console.log('map data ******', window.countryData)
        var data = window.countryData
        var map
        var myOptions = {
          center: new google.maps.LatLng(45.4555729, 9.169236),
          zoom: 2,
          minZoom: 2,
          mapTypeId: google.maps.MapTypeId.ROADMAP,

        }
        // initialize the map
        map = new google.maps.Map(document.getElementById('map-canvas'), myOptions)

        // align map to center
        google.maps.event.addListener(map, 'idle', function() {
          var allowedBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(20.124072, -30.002952),
            new google.maps.LatLng(20.124072, -30.002952));
          if (allowedBounds.contains(map.getCenter())) return;
          var c = map.getCenter(),
                 x = c.lng(),
                 y = c.lat(),
                 maxX = allowedBounds.getNorthEast().lng(),
                 maxY = allowedBounds.getNorthEast().lat(),
                 minX = allowedBounds.getSouthWest().lng(),
                 minY = allowedBounds.getSouthWest().lat();

             if (x < minX) x = minX;
             if (x > maxX) x = maxX;
             if (y < minY) y = minY;
             if (y > maxY) y = maxY;
             if(map.zoom<3){
               map.setCenter(new google.maps.LatLng(y,x));
             }
           });


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
