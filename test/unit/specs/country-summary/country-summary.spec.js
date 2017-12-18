import Vue from 'vue'
import summary from '@/components/countrySummary/country-summary.js'

describe("should test country summary", () => {
  let countrySummary, sandBox
  before(() => {
    var Constructor = Vue.extend(summary)
    countrySummary = new Constructor()
  })
  beforeEach(() => {
    sandBox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandBox.restore()
  })
  it('should set data', () => {
    var response = {}
    response.data = {
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
    }

    countrySummary.countrySummaryCallback(response, 'PER')

    expect(countrySummary.countrySummaries).to.equal(response.data)
    expect(countrySummary.countryName).to.equal(response.data.countryName)

    response.data.countryName = null
    response.data.countryId = response.data.countryId.slice(0, 2)

    countrySummary.countrySummaryCallback(response, 'PER')

    expect(countrySummary.countrySummaries).to.equal(response.data)
    expect(countrySummary.countryName).to.equal(response.data.countryId)
  })
})
