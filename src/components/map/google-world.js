import _ from 'lodash'
import $ from 'jquery'

/* eslint-disable no-undef */
export default {
  drawMap (data, $mapEl) {
    var map
    var mapOptions = {
      center: new window.google.maps.LatLng(33.386790019438294, 27.74469604492184),
      zoom: 3,
      minZoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true,
      scaleControl: true,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      }

    }
    // initialize the map
    map = new google.maps.Map($mapEl, mapOptions)
    google.maps.event.addDomListener(map, 'tilesloaded', function () {
      if ($('#zoomPos').length === 0) {
        $('div.gmnoprint').last().parent().wrap('<div id="zoomPos" />')
      }
    })

    map.setOptions({styles: this.mapStyleConfiguration()})
    return map
  },

  mapStyleConfiguration () {
    var styles = [
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
          {color: '#f2f2e5'}
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
            'color': 'blue'
          },
          {
            'visibility': 'on'
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
          strokeColor: '#fff',
          strokeOpacity: 1,
          strokeWeight: 0.3,
          fillOpacity: 0.95,
          name: rows[i][1]
        })
        country.countryCode = rows[i][0]
        country.setOptions({fillColor: this.getColorCodeOf(country, countryIndices)})
        var lastSelectedCountry = ''
        var self = this

        google.maps.event.addListener(country, 'click', function (event) {
          infowindow.close()
          if (lastSelectedCountry !== '') {
            lastSelectedCountry.setOptions({
              fillOpacity: 0.95,
              fillColor: self.getColorCodeOf(lastSelectedCountry, countryIndices),
              strokeOpacity: 1,
              strokeWeight: 0.3,
              strokeColor: '#fff'
            })
            if (lastSelectedCountry.countryCode === this.countryCode) {
              lastSelectedCountry = ''
              return
            }
          }
          lastSelectedCountry = this
          this.setOptions({
            fillColor: '#ffa500',
            strokeColor: '#ffa500',
            fillOpacity: 0.6,
            strokeOpacity: 1,
            strokeWeight: 2
          })
        })

        var infowindow = new google.maps.InfoWindow()
        // var lastMouseOverCountry = ''
        google.maps.event.addListener(country, 'mouseover', function (event) {
          if (lastSelectedCountry === '' || lastSelectedCountry.countryCode !==
            this.countryCode) {
            this.setOptions({
              fillOpacity: 0.3
            })
          }
          // if (lastMouseOverCountry !== this.name) {
          //   var contentString = '<div id="popover">' +
          //     '<strong>' + this.name + '</strong>' +
          //     '</div>'
          //   infowindow.setContent(contentString)
          //   infowindow.setPosition(event.latLng)
          //   lastMouseOverCountry = this.name
          // }
          // infowindow.open(map, country)
        })
        google.maps.event.addListener(country, 'mouseout', function (event) {
          if (lastSelectedCountry === '' || lastSelectedCountry.countryCode !==
            this.countryCode) {
            this.setOptions({
              fillOpacity: 0.95
              // fillColor: self.getColorCodeOf(this, countryIndices)
            })
          }
        })
        country.setMap(map)
      }
    }
  },

  getColorCodeOf (country, countryIndices) {
    var matchedCountry = this.getMatchedCountry(country, countryIndices)
    return matchedCountry ? matchedCountry.colorCode : '#606060'
  },
  getMatchedCountry (country, countryIndices) {
    let matchedCountry = _.filter(countryIndices,
      (countryObj) => { return countryObj.countryId === country.countryCode })
    return matchedCountry && matchedCountry.length >
      0 ? matchedCountry[0] : null
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
