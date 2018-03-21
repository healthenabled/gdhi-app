import Vue from 'vue'
import errorComp from '@/components/error-handler/404-error.js'

describe('Error Component', ()=> {
  let error
  before(() => {
    var Constructor = Vue.extend(errorComp)
    error = new Constructor().$mount()
  })
  it('should display given error message', () => {
    expect(error.$data.errorMessage)
      .to.equal('Page Not Found!.')
  })
})
