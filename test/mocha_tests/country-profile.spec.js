import { shallow, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import CountryProfile from  "../../src/components/countryProfile/country-profile.js";
import moxios from 'moxios';

describe("Country Profile ", () => {
  let wrapper;
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();
  let healthIndicatorData = {
    "countryId":"IND",
    "countryName":"India",
    "countryAlpha2Code":"IN",
    "overallScore":3.226190476190476,
    "categories":[
       {
          "id":1,
          "name":"Leadership and Governance",
          "overallScore":3.0,
          "phase":3,
          "indicators":[
             {
                "id":1,
                "code":"1",
                "name":"Digital health prioritized at the national level through dedicated bodies / mechanisms for governance",
                "indicatorDescription":"Does the country have a separate department / agency / national working group for digital health?",
                "score":4,
                "supportingText":"sdg",
                "scoreDescription":"Governance structure is fully-functional, government-led, consults with other ministries, and monitors implementation of digital health based on a work plan."
             }
          ]
        }
    ],
    "countryPhase":4,
    "collectedDate":"January 2018"
 };
 beforeEach(() => {
    moxios.install();
    wrapper = shallow(CountryProfile, {
      localVue,
      router
    });
    moxios.stubRequest(/\/api\/countries\/.*\/health_indicators/, {
      status: 200,
      response: healthIndicatorData
    });
 })
  it("should populate the data after successfull API call", (done) => {

    moxios.wait(() => {
      expect(wrapper.vm.healthIndicatorData).to.deep.equal(healthIndicatorData);
      expect(wrapper.vm.flagSrc).to.deep.equal(`/static/img/flags/${healthIndicatorData.countryAlpha2Code.toLowerCase()}.svg`);
      wrapper.vm.initialise();
      wrapper.vm.healthIndicatorData.categories.forEach((category) => {
        expect(category['showCategory']).to.equal(false);
      });
      done();
    });
  });
  it("should have the appropriate html elements based on the data", (done) => {
    moxios.wait(() => {
      expect(wrapper.find(".country-name").text()).to.equal(healthIndicatorData.countryName);
      expect(wrapper.find("#collected-date").text()).to.equal(`As on January 2018`);
      expect(wrapper.find(".export a").attributes().href).to.equal(wrapper.vm.url);
      expect(wrapper.find(".score").text()).to.equal(healthIndicatorData.countryPhase.toString());
      expect(wrapper.findAll(".category-bar").length).to.equal(healthIndicatorData.categories.length);
      const firstCategory = wrapper.findAll(".category-bar").at(0);
      expect(firstCategory.find(".sub-header").text()).to.equal(healthIndicatorData.categories[0].name);
      expect(firstCategory.findAll(".indicator").length).to.equal(healthIndicatorData.categories[0].indicators.length);
      const firstIndicator = firstCategory.findAll(".indicator").at(0);
      expect(firstIndicator.find(".indicator-name-value").text()).to.equal(healthIndicatorData.categories[0].indicators[0].name);
      expect(firstIndicator.findAll(".indicator-score-desc").at(0).text()).to.equal(healthIndicatorData.categories[0].indicators[0].indicatorDescription);
      expect(firstIndicator.findAll(".indicator-score-desc").at(1).text()).to.equal(healthIndicatorData.categories[0].indicators[0].scoreDescription);
      expect(firstIndicator.find(".indicator-score").text()).to.equal(healthIndicatorData.categories[0].indicators[0].score.toString());
      done();
    });
  });
  it("should updated the showCategory when the category is clicked", (done) => {
    moxios.wait(() => {
      const firstCategory = wrapper.findAll(".category-bar").at(0);
      firstCategory.find(".sub-header").trigger("click");
      expect(wrapper.vm.healthIndicatorData.categories[0].showCategory).to.equal(true);
      firstCategory.find(".sub-header").trigger("click");
      expect(wrapper.vm.healthIndicatorData.categories[0].showCategory).to.equal(false);
      done();
    });
  });
  afterEach(() => {
    moxios.uninstall();
  })
});
