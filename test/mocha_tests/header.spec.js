import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Header from  "../../src/components/header/header.js";
import moxios from 'moxios';

describe ("Header ", () => {
  let wrapper;
  it("should have the data", (done) => {
    wrapper = mount(Header);
    expect(wrapper.vm.countries).to.deep.equal({});
    expect(wrapper.vm.developmentIndicators).to.deep.equal([]);
    expect(wrapper.vm.healthIndicators).to.deep.equal({});
  });
  
})