import Vue from 'vue'
import Questionnaire from '@/components/health_indicator_questionnaire/edit-questionaire.js'

describe('Questionnaire.vue', () => {
  let ques, sandBox
  before(() => {
    var Constructor = Vue.extend(Questionnaire)
    ques = new Constructor()//.$mount()
  })
  beforeEach(() => {
    var countries = [{id: "IND", name: "INDIA"},{id: "JPN", name: "Japan"},{id: "SRL", name: "SriLanka"}]
    ques.countries = countries
    sandBox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandBox.restore()
  })
  it('country id should be that of the selected country', () => {
    sandBox.stub(ques, "getSelectedCountryName").returns("INDIA")
    expect(ques.countryId).to.equal('')
    expect(ques.validateCountryId()).to.equal(true)
    expect(ques.countryId).to.equal("IND")
  })
  it('country id should be reset to new value', () => {
    sandBox.stub(ques, "getSelectedCountryName").returns("INDIA")
    ques.countryId = "JPN"
    expect(ques.validateCountryId()).to.equal(true)
    expect(ques.countryId).to.equal("IND")
  })
  it('country id should be set only if name matches', () => {
    sandBox.stub(ques, "getSelectedCountryName").returns("IND")
    ques.countryId = 'JPN'
    expect(ques.validateCountryId()).to.equal(false)
    expect(ques.countryId).to.equal('')
  })
  it('country id should be set only if name matches exactly', () => {
    sandBox.stub(ques, "getSelectedCountryName").returns("India")
    ques.countryId = 'JPN'
    expect(ques.validateCountryId()).to.equal(false)
    expect(ques.countryId).to.equal('')
  })
  it('should call save only if vee validate and country validation succeeds', () => {
    let saveSpy = sinon.spy()
    ques.save = saveSpy
    sandBox.stub(ques, "validateCountryId").returns(true)
    ques.validateCallback(true)
    expect(saveSpy.called).to.equal(true);
  })

  it('should not call save even if either of vee validate or country validation fails', () => {
    let saveSpy = sinon.spy()
    ques.save = saveSpy
    var stub = sandBox.stub(ques, "validateCountryId").returns(false)
    ques.validateCallback(true)
    expect(saveSpy.called).to.equal(false);
    stub.restore()

    stub = sandBox.stub(ques, "validateCountryId").returns(true)
    ques.validateCallback(false)
    expect(saveSpy.called).to.equal(false);
    stub.restore()

    stub = sandBox.stub(ques, "validateCountryId").returns(false)
    ques.validateCallback(false)
    expect(saveSpy.called).to.equal(false);
    stub.restore()
  })
})
