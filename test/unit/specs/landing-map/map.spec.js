import Vue from 'vue'
import map from '@/components/landing-map/map.js'
import worldMap from '@/components/landing-map/world-map.js'
import axios from 'axios'
import {} from '../../../../src/app.js'

describe('Map vue component', () => {
  let sandBox, vueMap
  before(() => {
    var Constructor = Vue.extend(map)
    vueMap = new Constructor()
  })
  beforeEach(() => {
    sandBox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandBox.restore()
  })
  it('should fetch global health indices', (done) => {
    var countryHealthScores = [{
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
    const data = {'data': {'countryHealthScores': countryHealthScores}}
    const resolved = new Promise((resolve, reject) => resolve(data))
    sandBox.stub(axios, 'get').returns(resolved)

    let mockWorldMap = sinon.mock(worldMap)
    mockWorldMap.expects('drawMap').once()
    vueMap.fetchGlobalIndices()
      .then(() => {
        expect(vueMap.globalHealthIndicators).to.equal(countryHealthScores)
        mockWorldMap.verify()
        mockWorldMap.restore()
      })
      .then(done, done)
  })
})
