import { mount } from "@vue/test-utils";
import AutoSearch from "../../src/components/auto-search/auto-search.js";
import Autocomplete from 'vuejs-auto-complete'
import moxios from 'moxios';
import { sortBy } from 'lodash';

describe("AutoSearch", () => {
  let wrapper;
  let countryData = [
    { id : 'IND', name: 'India', countryAlpha2Code: 'IN'},
    { id : 'USA', name: 'United States of America', countryAlpha2Code: 'US'},
    { id : 'POL', name: 'Poland', countryAlpha2Code: 'PL'},
    { id : 'AUS', name: 'Australia', countryAlpha2Code: 'AU'}
  ];
  
  beforeEach(()=> {
    wrapper = mount(AutoSearch);
  });

  it("should contain the autocomplete component", () => {
    expect(wrapper.contains(Autocomplete)).to.equal(true);
  });
  
  it("should contain the countires value and source of autocomplete to be set to countries", (done) => {
    expect(wrapper.vm.countries).to.deep.equal([]);
    moxios.install();
    moxios.stubRequest('/api/countries', {
      status: 200,
      response: countryData
    });
    moxios.wait(() => {
      const sortedArray = sortBy(countryData, "name");
      expect(wrapper.vm.countries).to.deep.equal(sortedArray);
      const autocompleteComp = wrapper.find(Autocomplete);
      expect(autocompleteComp.props().source).to.deep.equal(sortedArray);
      done()
    });
  });

  it("should set the country id when the onCountrySelect method", (done) => {
    moxios.install();
    moxios.stubRequest('/api/countries', {
      status: 200,
      response: countryData
    });
    moxios.wait(() => {
      wrapper.vm.onCountrySelect({
          value: 'AUS',
          display: "Australia",
          selectedObject: countryData[3] 
      });
      expect(wrapper.vm.countryId).to.deep.equal('AUS');
      done()
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });
})