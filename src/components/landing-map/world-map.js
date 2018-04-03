import L from 'leaflet';
//import countriesData from '../../assets/countries_mega.json';
import helper from './map-helper';
import eventHandler from './map-event-handler';
import _ from 'lodash';
import axios from 'axios'

export default {
  BLACK_COLOR_CODE: '#000',
  WHITE_COLOR_CODE: '#fff',
  lastClickedCountry: '',
  lastMouseOverCountry: '',
  drawMap(healthData, postClickCallBack) {
    this.healthData = healthData;
    const self = this;
    const ResetButton = L.Control.extend({
      options: {
        position: 'topleft',
      },
      onAdd(map) {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control ' +
          'leaflet-control-custom');
        container.type = 'button';
        container.title = 'Reset Map Selections';
        container.id = 'reset-btn';
        container.onclick = function () {
          self.resetMap(postClickCallBack);
        };

        return container;
      },
    });
    if (this.map !== undefined) {
      this.map.off();
      this.map.remove();
    }
    this.map = L.map('map', { attributionControl: false }).setView([44, -31], 2);
    this.map.setMinZoom(2);
    L.control.attribution({ position: 'bottomleft' }).addTo(this.map);
    this.map.addControl(new ResetButton());
    if (!self.countriesData) {
      axios.get('/static/data/countries_mega.json')
        .then(function (response) {
        self.countriesData = response.data;
        return self.addMapToLeaflet(self, response.data, healthData, postClickCallBack);
      });
    }
    return this.addMapToLeaflet(this, this.countriesData, healthData, postClickCallBack);
  },
  addMapToLeaflet(self, data, healthData, postClickCallBack) {
    self.geoLayer = L.geoJson(data, {
      style(feature) {
        const fillColorCode = helper.getColorCodeOf(
          feature.properties.BRK_A3,
          healthData,
        );
        return {
          weight: 1,
          color: self.WHITE_COLOR_CODE,
          fillColor: fillColorCode,
          fillOpacity: 0.95,
          id: feature.id,
        };
      },
      onEachFeature(feature, layer) {
        if (feature.properties) {
          let popupString = '<div class="popup">';
          popupString += feature.properties.NAME_LONG;
          popupString += '</div>';
          layer.bindTooltip(popupString);
        }
        layer.on({
          mousemove(e) {
            eventHandler.onMouseMove(e.target, self.lastMouseOverCountry);
          },
          mouseout(e) {
            eventHandler.onMouseOut(e.target, self.lastMouseOverCountry);
          },
          click(e) {
            self.handleClick(e.target, feature.properties.BRK_A3, self.lastClickedCountry, self.healthData, postClickCallBack);
          },
        });
      },
    }).addTo(self.map);
    return self.geoLayer._layers;
  },
  handleSearch(countryCode, postSearchCallBack) {
    const searchCountry = _.filter(this.geoLayer._layers, (layer) => layer.feature.properties.BRK_A3 === countryCode);
    console.log('Searching', searchCountry[0]);
    this.handleClick(
      searchCountry[0], countryCode, this.lastClickedCountry, this.healthData,
      postSearchCallBack,
    );
  },
  handleClick($el, countryCode, lastClickedCountry, healthData, postClickCallBack) {
    const clickState = eventHandler.onCountryClick($el, lastClickedCountry, healthData);
    if (clickState === 'CLICK_ON') {
      this.lastClickedCountry = $el;
      postClickCallBack({
        type: 'COUNTRY',
        countryCode: $el.feature.properties.BRK_A3,
        countryName: $el.feature.properties.NAME_LONG,
      });
      this.map.fitBounds($el.getBounds(), { maxZoom: 7 });
    } else if (clickState === 'RESET_CLICK') {
      this.lastClickedCountry = '';
      postClickCallBack({ type: 'GLOBAL' });
      this.map.setView([44, -31], 2);
    } else {
      this.lastClickedCountry = '';
      postClickCallBack({
        type: 'COUNTRY',
        countryCode,
        countryName: '',
      });
      this.map.setView([44, -31], 2);
    }
  },
  resetMap(postClickCallBack) {
    eventHandler.resetLayer(this.lastClickedCountry, this.healthData);
    this.lastClickedCountry = '';
    postClickCallBack({ type: 'GLOBAL' });
  },
};
