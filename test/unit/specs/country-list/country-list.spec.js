import Vue from 'vue'
import countryList from '@/components/countryList/country-list.js'

describe("should test country list", () => {
  let list, sandBox
  before(() => {
    var Constructor = Vue.extend(countryList)
    list = new Constructor()
  })
  beforeEach(() => {
    sandBox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandBox.restore()
  })

  it.only('should set data', () => {
    var indices = {"data": {}}

    indices.data.countryHealthScores = [{
      "countryId": "GHA",
      "countryName": "Ghana",
      "countryPhase": 4,
      "categories": [{
        "categoryId": 1,
        "categoryName": "c1",
        "indicators": [{
          "indicatorId": 1,
          "indicatorName": "ind1",
          "indicatorDescription": "ind def",
          "score": null,
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
            "scoreDescription": "score desc 2"
          }, {
            "indicatorId": 3,
            "indicatorName": "ind3",
            "indicatorDescription": "ind3 def",
            "score": 2,
            "scoreDescription": "score desc 3"
          }]
        }
      ]
    }, {
      "countryId": "IND",
      "countryName": "India",
      "countryPhase": 5,
      "categories": [{
        "categoryId": 1,
        "categoryName": "c1",
        "indicators": [{
          "indicatorId": 1,
          "indicatorName": "ind1",
          "indicatorDescription": "ind def",
          "score": 1,
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
            "score": 2,
            "scoreDescription": "score desc 2"
          }, {
            "indicatorId": 3,
            "indicatorName": "ind3",
            "indicatorDescription": "ind3 def",
            "score": 3,
            "scoreDescription": "score desc 3"
          }]
        }
      ]
    }
    ]

    var expectCountryList = [ {
      "countryId": "GHA",
      "countryName": "Ghana",
      "overallPhase": 4
    }, {
      "countryId": "IND",
      "countryName": "India",
      "overallPhase": 5
    }]

    list.countryListCallback(indices)

    expect(list.globalHealthIndicators).to.deep.equal(indices.data.countryHealthScores)
    list.countryList.forEach((elem, index) => {
      console.log(elem)
      console.log(expectCountryList[index])
      expect(elem).to.deep.equal(expectCountryList[index])
    })
  })
})
