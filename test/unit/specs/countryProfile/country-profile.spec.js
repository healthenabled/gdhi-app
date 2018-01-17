import Vue from 'vue'
import countryProfile from '@/components/countryProfile/country-profile.js'

describe("should test country profile", () => {
  let profile, sandBox
  before(() => {
    var Constructor = Vue.extend(countryProfile)
    profile = new Constructor()
  })
  beforeEach(() => {
    sandBox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandBox.restore()
  })


  it('should set health indicators', () => {
    var response = {}
    response.data = {
      "countryId": "GHA",
      "countryName": "Ghana",
      "countryPhase": 4,
      "overallScore": 4,
      "categories": [{
        "categoryId": 1,
        "categoryName": "c1",
        "indicators": [{
          "id": 1,
          "name": "ind1",
          "indicatorDescription": "ind def",
          "score": null,
          "supportingText": "sup text 1",
          "scoreDescription": "score desc 1"
        }]
      },
        {
          "categoryId": 2,
          "categoryName": "c2",
          "indicators": [{
            "indicatorId": 2,
            "indicatorName": "ind2",
            "indicatorDescription": "ind2 def",
            "score": 1,
            "supportingText": "sup text 1",
            "scoreDescription": "score desc 2"
          }, {
            "indicatorId": 3,
            "indicatorName": "ind3",
            "indicatorDescription": "ind3 def",
            "score": 2,
            "supportingText": "sup text 1",
            "scoreDescription": "score desc 3"
          }]
        }
      ]
    }
    profile.healthIndicatorCallback(response)
    expect(profile.healthIndicatorData).to.deep.equal(response.data)
    response.data.categories.forEach(cat => {
      expect(cat.showIndicator).to.equal(false)
      expect(cat.expandCollapseBtn).to.equal('+')
    })
  })
})
