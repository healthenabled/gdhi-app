import Vue from 'vue'
import Questionnaire from '@/components/healthIndicatorQuestionnaire/edit-questionaire.js'
import VeeValidate from "vee-validate";

describe('Questionnaire.vue', () => {
  let ques, sandBox
  before(() => {
    var Constructor = Vue.extend(Questionnaire)
    ques = new Constructor()//.$mount()
    Vue.use(VeeValidate);
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
    ques.saveData = saveSpy
    const resolved = new Promise((resolve, reject) => resolve(true))
    ques.submit().then((resolved) => {
      expect(saveSpy.called).to.equal(true);
    })
  })

  it('should not call save even if either of vee validate fails', () => {
    let saveSpy = sinon.spy()
    ques.saveData = saveSpy
    const resolved = new Promise((resolve, reject) => resolve(false))
    ques.submit().then((resolved) => {
      expect(saveSpy.called).to.equal(false);
    })
  })
})
