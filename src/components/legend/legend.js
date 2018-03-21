import Vue from 'vue';
import mapLegend from './legend.html';
import colors from '../common/color-codes.js';

export default Vue.extend({
  data() {
    this.object = {
      scoreToColor: colors.getColorCodes(),
    };
    return this.object;
  },
  template: mapLegend,
});
