/* eslint-disable no-undef */
export default {
  drawMap (data, $mapEl) {
    var map
    var myOptions = {
      center: new window.google.maps.LatLng(45.4555729, 9.169236),
      zoom: 2,
      minZoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    // initialize the map
    map = new google.maps.Map($mapEl, myOptions)

    // align map to center
    google.maps.event.addListener(map, 'idle', function () {
      var allowedBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(20.124072, -30.002952),
        new google.maps.LatLng(20.124072, -30.002952))
      if (allowedBounds.contains(map.getCenter())) return
      var c = map.getCenter()
      var x = c.lng()
      var y = c.lat()
      var maxX = allowedBounds.getNorthEast().lng()
      var maxY = allowedBounds.getNorthEast().lat()
      var minX = allowedBounds.getSouthWest().lng()
      var minY = allowedBounds.getSouthWest().lat()

      if (x < minX) x = minX
      if (x > maxX) x = maxX
      if (y < minY) y = minY
      if (y > maxY) y = maxY
      if (map.zoom < 3) {
        map.setCenter(new google.maps.LatLng(y, x))
      }
    })
    map.setOptions({styles: this.mapStyleConfiguration()})
    // this.bindEventsToMap(data, {}, map)
    return map
  },
  constructNewCoordinates (polygon) {
    var newCoordinates = []
    var coordinates = polygon['coordinates'][0]
    for (var i in coordinates) {
      newCoordinates.push(
        new google.maps.LatLng(coordinates[i][1], coordinates[i][0]))
    }
    return newCoordinates
  },

  mapStyleConfiguration () {
    var styles = [
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
          {color: '#f2f2e4'}
        ]
      },
      {
        featureType: 'landscape',
        stylers: [
          { visibility: 'off' }
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
    return styles
  },
  bindEventsToMap (boundaryData, countryIndices, map) {
    var rows = boundaryData['rows']
    for (var i in rows) {
      if (rows[i][1] !== 'Antarctica') {
        var newCoordinates = []
        var geometries = rows[i][2]['geometries']
        if (geometries) {
          for (var j in geometries) {
            newCoordinates.push(this.constructNewCoordinates(geometries[j]))
          }
        } else {
          newCoordinates = this.constructNewCoordinates(rows[i][2]['geometry'])
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
        })
        google.maps.event.addListener(country, 'mouseout', function () {
          this.setOptions({fillOpacity: 0})
        })
        google.maps.event.addListener(country, 'click', function () {
          alert(this.name)
        })

        country.setMap(map)
      }
    }
  }
}
