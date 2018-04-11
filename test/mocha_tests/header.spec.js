import { shallow, mount, RouterLinkStub } from '@vue/test-utils';
import router from '../../src/router/index.js';
import Header from  "../../src/components/header/header.js";
import moxios from 'moxios';
import autoSearch from '../../src/components/auto-search/auto-search.js';

describe ("Header ", () => {
  let wrapper;
  it("should have the data", () => {
    wrapper = shallow(Header);
    expect(wrapper.vm.countries).to.deep.equal({});
    expect(wrapper.vm.developmentIndicators).to.deep.equal([]);
    expect(wrapper.vm.healthIndicators).to.deep.equal({});
  });
  it("should have the data", () => {
    wrapper = mount(Header, {
      stubs: {
        'router-link': RouterLinkStub,
        'router-view': {
           render: h => h(autoSearch)
         }
      }
    });
    expect(wrapper.findAll(".hd-element").length).to.equal(4);
    expect(wrapper.findAll(autoSearch).length).to.equal(1);
  });
  
})