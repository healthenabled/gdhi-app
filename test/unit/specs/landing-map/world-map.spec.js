import worldMap from '@/components/landing-map/world-map.js'
import L from 'leaflet'

const countryIndices = [{
  'countryId': 'AFG',
  'countryName': 'Afghanistan',
  'countryPhase': 5,
  'overallScore': 4.75,
  'colorCode': '#11184B',
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

const geoData = {'type': 'FeatureCollection',
  'features': [
    {'type': 'Feature',
      'geometry': null,
      'properties': {'scalerank': 3,
        'featurecla': 'Admin-0 country',
        'SU_A3': 'SGP',
        'BRK_DIFF': 0,
        'NAME': 'Singapore',
        'NAME_LONG': 'Singapore',
        'BRK_A3': 'SGP',
        'BRK_NAME': 'Singapore',
        'BRK_GROUP': '',
        'ABBREV': 'Sing.'
      }}
  ]}

describe('World Map', () => {
  let layer, mockLayer, callback, callBackSpy, mapStub;

  beforeEach(() => {
    mapStub = sinon.stub(worldMap, 'drawMap').callsFake(function () {
      this.map = {
        fitBounds: function () {
          console.log('fitting bounds')
        },
        setView: function () {
          console.log('setting view')
        }
      }
    })
    worldMap.drawMap({}, function () {})
    worldMap.lastClickedCountry = {}
    layer = L.geoJSON(geoData)
    mockLayer = sinon.mock(layer)

    callback = function a (arg1) {console.log(arg1)}
    callBackSpy = sinon.spy(callback)
  })

  afterEach(() => {
    assert(mapStub.called)
    mockLayer.restore()
    mapStub.restore()
  })

  it('should zoom and pass country name on clicking country', () => {
    layer.feature = {'properties': {
      'BRK_A3': 'AFG',
      'NAME_LONG': 'Afghanistan'
    }}

    worldMap.handleClick(layer, 'AFG', '', countryIndices, callBackSpy)
    assert(callBackSpy.calledOnce)
    expect(callBackSpy.getCall(0).args[0].type).to.equal('COUNTRY')
    expect(callBackSpy.getCall(0).args[0].countryCode).to.equal('AFG')
    expect(callBackSpy.getCall(0).args[0].countryName).to.equal('Afghanistan')
    expect(worldMap.lastClickedCountry).to.equal(layer)
  })


  it('should reset map and pass country code on clicking unknown country', () => {
    layer.feature = {'properties': {
      'BRK_A3': 'SIA',
      'NAME_LONG': ''
    }}
    worldMap.lastClickedCountry = layer
    worldMap.handleClick('', 'SIA', layer, countryIndices, callBackSpy)
    assert(callBackSpy.calledOnce)
    expect(callBackSpy.getCall(0).args[0].type).to.equal('COUNTRY')
    expect(callBackSpy.getCall(0).args[0].countryCode).to.equal('SIA')
    expect(callBackSpy.getCall(0).args[0].countryName).to.equal('')
    expect(worldMap.lastClickedCountry).to.equal('')
  })
})
