import Vue from 'vue'
import Questionnaire from '@/components/health_indicator_questionnaire/health_indicator_questionnaire.js'

describe('Questionnaire.vue', () => {
  let ques, sandBox
  before(() => {
    var Constructor = Vue.extend(Questionnaire)
    ques = new Constructor()//.$mount()
  })
  beforeEach(() => {
    sandBox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandBox.restore()
  })
  it("should set showEdit to true by default", () => {
    expect(ques.showEdit).to.equal(true)
  })
  it("should transform health indicators",  () => {
    var data = [{
      "categoryId": 1,
      "categoryName": "c1",
      "indicators": [{
        "indicatorId": 1,
        "indicatorName": "ind1",
        "indicatorDefinition": "ind def",
        "scores": [{"score": 0, "scoreDefinition": "ind1 0 def"}, {"score": 1, "scoreDefinition": "ind1 1 def"}]
      }]
    }, {
      "categoryId": 2,
      "categoryName": "c2",
      "indicators": [{
        "indicatorId": 2,
        "indicatorName": "ind2",
        "indicatorDefinition": "ind2 def",
        "scores": [{"score": 0, "scoreDefinition": "ind2 0 def"}, {"score": 1, "scoreDefinition": "ind2 1 def"}]
      }, {
        "indicatorId": 3,
        "indicatorName": "ind3",
        "indicatorDefinition": "ind3 def",
        "scores": [{"score": 0, "scoreDefinition": "ind3 0 def"}, {"score": 1, "scoreDefinition": "ind3 1 def"}]
      }]
    }]
    var expected = {
      1: {categoryId: 1, indicatorId: 1, score: null, supportingText: ''},
      2: {categoryId: 2, indicatorId: 2, score: null, supportingText: ''},
      3: {categoryId: 2, indicatorId: 3, score: null, supportingText: ''}
    }

    ques.setUpHealthIndicators(data, false)

    expect(ques.healthIndicators).to.deep.equal(expected)
    data.forEach(datum => {
      datum.indicators.forEach(indicator => {
        expect(indicator.showIndicator).to.equal(false)
        expect(indicator.expandCollapseBtn).to.equal('+')
      })
    })

    ques.setUpHealthIndicators(data, true)

    data.forEach(datum => {
      datum.indicators.forEach(indicator => {
        expect(indicator.showIndicator).to.equal(true)
        expect(indicator.expandCollapseBtn).to.equal('-')
      })
    })
  })
  it('should transform data for view form', () => {
    var options = {}
    var scores = {}
    options.data = [{
      "categoryId": 1,
      "categoryName": "c1",
      "indicators": [{
        "indicatorId": 1,
        "indicatorName": "ind1",
        "indicatorDefinition": "ind def",
        "scores": [{"score": 0, "scoreDefinition": "ind1 0 def"}, {"score": 1, "scoreDefinition": "ind1 1 def"}]
      }]
    }, {
      "categoryId": 2,
      "categoryName": "c2",
      "indicators": [{
        "indicatorId": 2,
        "indicatorName": "ind2",
        "indicatorDefinition": "ind2 def",
        "scores": [{"score": 0, "scoreDefinition": "ind2 0 def"}, {"score": 1, "scoreDefinition": "ind2 1 def"}]
      }, {
        "indicatorId": 3,
        "indicatorName": "ind3",
        "indicatorDefinition": "ind3 def",
        "scores": [{"score": 0, "scoreDefinition": "ind3 0 def"}, {"score": 1, "scoreDefinition": "ind3 1 def"}]
      }]
    }]

    scores.data = {
      "countryId": "PER",
      "countrySummary": {
        "countryId": "PER",
        "countryName": "Peru",
        "summary": "sdfsd",
        "contactName": "contact 1",
        "contactDesignation": "contact role",
        "contactOrganization": "sdfsd",
        "contactEmail": "pavi@gmail.com",
        "dataFeederName": "ffsd",
        "dataFeederRole": "sdfds",
        "dataFeederEmail": "d@d.com",
        "dataCollectorName": "",
        "dataCollectorRole": "",
        "dataCollectorEmail": "",
        "collectedDate": "08-09-2001",
        "resources": ["dfdf"]
      },
      "healthIndicators": [{
        "categoryId": 1,
        "indicatorId": 1,
        "score": null,
        "supportingText": "sp1"
      }, {
        "categoryId": 2,
        "indicatorId": 2,
        "score": 2,
        "supportingText": "sp2"
      },
        {
          "categoryId": 2,
          "indicatorId": 3,
          "score": 5,
          "supportingText": "sp3"
        }]
    }
    var expected = {
      1: {categoryId: 1, indicatorId: 1, score: null, supportingText: 'sp1'},
      2: {categoryId: 2, indicatorId: 2, score: 2, supportingText: 'sp2'},
      3: {categoryId: 2, indicatorId: 3, score: 5, supportingText: 'sp3'}
    }

    ques.viewFormCallback(options, scores)

    expect(ques.questionnaire).to.deep.equal(options.data)
    expect(ques.countrySummary).to.deep.equal(scores.data.countrySummary)
    expect(ques.healthIndicators).to.deep.equal(expected)
  })
})