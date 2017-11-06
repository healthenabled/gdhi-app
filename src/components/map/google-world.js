import _ from 'lodash'

/* eslint-disable no-undef */
export default {
  drawMap (data, $mapEl) {
    var map
    var myOptions = {
      center: new window.google.maps.LatLng(43.068117532484706, -345.2356098368254),
      zoom: 2,
      minZoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true,
      scaleControl: true,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false
    }
    map = new google.maps.Map($mapEl, myOptions)
    if (map.zoom < 3) {
      map.setCenter(new google.maps.LatLng(43.068117532484706, -345.2356098368254))
    }
    map.setOptions({styles: this.mapStyleConfiguration()})
    return map
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
        featureType: 'water',
        elementType: 'labels',
        stylers: [
          { visibility: 'off' }
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
      },
      {
        'featureType': 'administrative',
        'elementType': 'geometry',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'administrative.country',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#ff2546'
          }
        ]
      },
      {
        'featureType': 'administrative.country',
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'administrative.land_parcel',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'labels.text',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      }

    ]
    return styles
  },
  bindEventsToMap (boundaryData, countryIndices, map) {
    console.log('country indices', countryIndices)
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
          fillOpacity: 0.3,
          name: rows[i][1]
        })
        country.country_code = rows[i][0]
        country.setOptions({fillColor: this.getColorCodeOf(country, countryIndices)})
        // var infowindow = new google.maps.InfoWindow()
        // google.maps.event.addListener(country, 'mouseover', function (event) {
        //   var contentString = '<div id="content">' +
        //     '<strong>' + this.name + '</strong>' +
        //     '</div>'
        //   infowindow.setContent(contentString)
        //   infowindow.setPosition(event.latLng)
        //   infowindow.open(map, country)
        // })
        var lastSelectedCountry = ''
        var self = this
        google.maps.event.addListener(country, 'click', function (event) {
          if (lastSelectedCountry !== '') {
            lastSelectedCountry.setOptions({
              fillOpacity: 0.3,
              fillColor: self.getColorCodeOf(lastSelectedCountry, countryIndices)
            })
          }
          lastSelectedCountry = this
          this.setOptions({fillOpacity: 0.6})
          this.setOptions({fillColor: '#ffa500'})
        })

        country.setMap(map)
      }
    }
  },
  getColorCodeOf (country, countryIndices) {
    let matchedCountry = _.filter(countryIndices,
      (countryObj) => { return countryObj.country_code === country.country_code })
    return matchedCountry && matchedCountry.length >
      0 ? matchedCountry[0].color_code : '#606060'
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
