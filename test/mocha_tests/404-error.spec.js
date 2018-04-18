import { mount } from '@vue/test-utils';
import ErrorComp from  "../../src/components/error-handler/404-error.js";

describe("Error Page", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ErrorComp);
  });
  it(" should have errorMessage in the component", () => {
    expect(wrapper.vm.errorMessage).to.equal("Page Not Found!.");
  });
  it(" should contain the error message in the HTML", () => {
    expect(wrapper.find(".errorMessage").text()).to.include(wrapper.vm.errorMessage);
  });
});
