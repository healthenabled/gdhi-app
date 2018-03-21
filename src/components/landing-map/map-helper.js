import colors from '../common/color-codes.js';
import _ from 'lodash';

export default {
  getColorCodeFor(score) {
    const colorCodes = colors.getColorCodes();
    const colorHashArray = colorCodes.filter((c) => (score === null ? 'NA' : c.score === JSON.stringify(score)));
    return colorHashArray.length !== 0 ? colorHashArray[0].color : '#606060';
  },
  getColorCodeOf(country, countryIndices) {
    const matchedCountry = this.getMatchedCountry(country, countryIndices);
    return matchedCountry ? matchedCountry.colorCode : '#606060';
  },
  getMatchedCountry(countryCode, countryIndices) {
    const matchedCountry = _.filter(
      countryIndices,
      (countryObj) => countryObj.countryId === countryCode,
    );
    return matchedCountry && matchedCountry.length >
    0 ? matchedCountry[0] : null;
  },
};
