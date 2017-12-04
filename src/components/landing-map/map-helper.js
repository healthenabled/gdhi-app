import colors from '../common/color-codes.js'
import _ from 'lodash'

export default {
  getColorCodeFor (score) {
    var colorCodes = colors.getColorCodes()
    var colorHashArray = colorCodes.filter(function (c) {
      return score === null ? 'NA' : c['score'] === JSON.stringify(score)
    })
    return colorHashArray.length !== 0 ? colorHashArray[0]['color'] : '#606060'
  },
  getColorCodeOf (country, countryIndices) {
    var matchedCountry = this.getMatchedCountry(country, countryIndices)
    return matchedCountry ? this.getColorCodeFor(matchedCountry.countryPhase) : '#606060'
  },
  getMatchedCountry (countryCode, countryIndices) {
    let matchedCountry = _.filter(countryIndices,
      (countryObj) => { return countryObj.countryId === countryCode })
    return matchedCountry && matchedCountry.length >
    0 ? matchedCountry[0] : null
  }
}
