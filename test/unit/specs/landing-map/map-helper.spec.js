import mapHelper from '@/components/landing-map/map-helper.js'

const countryIndices = [{
  'countryId': 'AFG',
  'countryName': 'Afghanistan',
  'countryPhase': 5,
  'overallScore': 4.75,
  'categories': [{
    'id': 1,
    'name': 'Leadership and Governance',
    'overallScore': 4.5,
    'phase': 5,
    'indicators': [{
      'id': 1,
      'indicatorDescription': 'Does the country have a separate department / agency / ' +
      'national working group for digital health?',
      'name': 'Digital health prioritized at the national level through dedicated bodies / ' +
      'mechanisms for governance',
      'score': 4,
      'scoreDescription': 'Governance structure is fully-functional, government-led, consults' +
        'with other ministries, and monitors implementation of digital health based on a work' +
        'plan.',
      'supportingText': null
    }]
  }]
}]

describe('Map Helper', () => {
  it.only('should get color code for score', () => {
    expect(mapHelper.getColorCodeFor(4)).to.equal('#225E8E')
  })
  it.only('should get color code for score > 5', () => {
    expect(mapHelper.getColorCodeFor(7)).to.equal('#606060')
  })
  // TODO: check if this required
  // it.only('should get color code for score = 0', () => {
  //   expect(mapHelper.getColorCodeFor(0)).to.equal('#606060')
  // })
  it.only('should get color code for score = NA', () => {
    expect(mapHelper.getColorCodeFor('NA')).to.equal('#606060')
  })
  it.only('should get color code for country code', () => {
    expect(mapHelper.getColorCodeOf('AFG', countryIndices)).to.equal('#11184B')
  })
})
