export default {
  /* eslint-disable no-undef */
  countryClickHandler: function (country, countryIndices, callBack, googleObj) {
    var mapHandlerObj = this
    mapHandlerObj.lastSelectedCountry = ''
    google.maps.event.addListener(country, 'click', function () {
      if (mapHandlerObj.lastSelectedCountry !== '') {
        mapHandlerObj.lastSelectedCountry.setOptions({
          fillOpacity: 0.95,
          fillColor: googleObj.getColorCodeOf(mapHandlerObj.lastSelectedCountry, countryIndices)
        })
      }
      mapHandlerObj.lastSelectedCountry = this
      this.setOptions({fillColor: '#CF0A01'})
      callBack(this)
    })
  },

  countryMouseOverHandler: function (country, map) {
    var self = this
    self.lastMouseOverCountry = ''
    self.infoWindow = new google.maps.InfoWindow()
    google.maps.event.addListener(country, 'mouseover', function (event) {
      if (self.lastMouseOverCountry !== this.name) {
        var contentString = '<div id="popover">' +
          '<strong>' + this.name + '</strong>' +
          '</div>'
        self.infoWindow.setContent(contentString)
        self.infoWindow.setPosition(event.latLng)
        self.lastMouseOverCountry = this.name
      }
      self.infoWindow.open(map, country)
    })
  }

}