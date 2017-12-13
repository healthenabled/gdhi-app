import Vue from 'vue'
import panel from '@/components/indicatorPanel/indicator-panel.js'

describe("should test indicator panel", () => {
  let indicatorPanel, sandBox
  before(() => {
    var Constructor = Vue.extend(panel)
    indicatorPanel = new Constructor()
  })
  beforeEach(() => {
    sandBox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandBox.restore()
  })

  it("should set up data for health indicator for a country", () => {
    var response = {}
    response.data = {
      "countryId": "GHA",
      "countryName": "Ghana",
      "countryPhase": 4,
      "overallScore": 4,
      "categories": [{
        "categoryId": 1,
        "categoryName": "c1",
        "overallScore": 3.33,
        "phase": 4,
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
          "overallScore": 3.33,
          "phase": 4,
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

    indicatorPanel.getHealthIndicatorCallback(response)

    expect(indicatorPanel.healthIndicators).to.deep.equal(response.data)
    expect(indicatorPanel.showCountryDetail).to.equal(true)
    expect(indicatorPanel.country.countryName).to.equal(response.data.countryName)
  })

  it("should set up data for global health indicator", () => {
    var response = {}
    response.data = {
      "overallScore": 4,
      "categories": [{
        "categoryId": 1,
        "categoryName": "c1",
        "overallScore": 3.33,
        "phase": 4
      },
        {
          "categoryId": 2,
          "categoryName": "c2",
          "overallScore": 3.33,
          "phase": 4
        }
      ]
    }

    indicatorPanel.getGlobalHealthIndicatorCallback(response)

    var expected = {
      'overallCountryScore': response.data.overAllScore,
      'categories': response.data.categories
    }

    expect(indicatorPanel.globalHealthIndicators).to.deep.equal(expected)
    expect(indicatorPanel.showCountryDetail).to.equal(false)
  })

})
