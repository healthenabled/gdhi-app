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
  it('should call save only if vee validate succeeds', () => {
    let saveSpy = sinon.spy()
    ques.save = saveSpy
    ques.validateCallback(true)
    expect(saveSpy.called).to.equal(true);
  })

  it('should not call save even if either of vee validate fails', () => {
    let saveSpy = sinon.spy()
    ques.save = saveSpy
    ques.validateCallback(false)
    expect(saveSpy.called).to.equal(false);
  })
})
