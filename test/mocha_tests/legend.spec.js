import { mount } from '@vue/test-utils';
import MapLegend from  "../../src/components/legend/legend.js";
import colorCodes from  "../../src/components/common/color-codes.js";
import VueI18n from 'vue-i18n';

describe ("legends", () => {
  let wrapper ;
  let colorCodesValues = colorCodes.getColorCodes();
  const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
  });
  beforeEach(() => {
    wrapper = mount(MapLegend, {i18n});
  })
  it("should return the color codes object", () => {
    expect(wrapper.findAll(".l-box").length).to.equal(colorCodesValues.length);
  });
  it("should display the correct phase in the li", () => {
    expect(wrapper.findAll(".l-box").at(0).text()).to.equal(colorCodesValues[0].score);
  });
})
