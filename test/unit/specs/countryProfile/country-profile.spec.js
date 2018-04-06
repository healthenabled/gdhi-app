import Vue from 'vue'
import countryProfile from '@/components/countryProfile/country-profile.js'
import {shallow} from '@vue/test-utils'

describe("should test country profile", () => {
  let profile, sandBox
  var response = {}
  before(() => {
    var Constructor = Vue.extend(countryProfile)
    profile = new Constructor()
  })
  beforeEach(() => {
    sandBox = sinon.sandbox.create()

    response.data = {
      "countryId": "GHA",
      "countryName": "Ghana",
      "countryPhase": 4,
      "overallScore": 4,
      "countryAlpha2Code": "PE",
      "collectedDate": "April 2018",
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
  })
  afterEach(() => {
    sandBox.restore()
  })


  it('should set health indicators', () => {

    profile.healthIndicatorCallback(response)
    expect(profile.healthIndicatorData).to.deep.equal(response.data)
    response.data.categories.forEach(cat => {
      expect(cat.showCategory).to.equal(false)
    })
  })

  it('should display as on date when it is not empty', () => {

    const $route = {path: 'test', params: {countryCode: 'IND'}};
    const wrapper = shallow(countryProfile, {
      mocks: {
        $route
      },
      data: {
        healthIndicatorData: response.data
      }
    });

    var actualDate = wrapper.vm.$el.querySelector('#collected-date').innerText;
    console.log(actualDate);
    expect(actualDate).to.match(/As on April 2018/);


  })


})
