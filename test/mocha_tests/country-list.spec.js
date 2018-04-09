import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import CountryList from  "../../src/components/countryList/country-list.js";
import moxios from 'moxios';

describe("Country List", () => {
  let wrapper;
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();
  let responseData = {
    "countryHealthScores":[
      {
        "countryId":"IND",
        "countryName":"India",
        "countryAlpha2Code":"IN",
        "overallScore":3.226190476190476,
        "countryPhase":4,
        "collectedDate":"January 2018"
      },
      {
        "countryId":"SGP",
        "countryName":"Singapore",
        "countryAlpha2Code":"SG",
        "overallScore":3.619047619047619,
        "countryPhase":null,
        "collectedDate":"November 2018"
      }
    ]
 };
  beforeEach(()=> {
    wrapper = mount(CountryList, {
      localVue,
      router
    });
  });
  it(" should render one li for each country", (done) => {
    moxios.install();
    moxios.stubRequest('/api/countries_health_indicator_scores?categoryId=&phase=', {
      status: 200,
      response: responseData
    });
    moxios.wait(() => {
      expect(wrapper.vm.globalHealthIndicators).to.deep.equal(responseData.countryHealthScores);
      expect(wrapper.findAll(".countries-list-details-country").length).to.equal(responseData.countryHealthScores.length);
      done();
    });
  });

  it(" should display the correct country score and name", (done) => {
    moxios.install();
    moxios.stubRequest('/api/countries_health_indicator_scores?categoryId=&phase=', {
      status: 200,
      response: responseData
    });
    moxios.wait(() => {
      expect(wrapper.findAll(".countries-list-details-country").at(0).find(".country-score").text()).to.equal(responseData.countryHealthScores[0].countryPhase.toString());
      expect(wrapper.findAll(".countries-list-details-country").at(0).find(".country-name").text()).to.equal(responseData.countryHealthScores[0].countryName);
      expect(wrapper.findAll(".countries-list-details-country").at(1).find(".country-score").text()).to.equal('NA');
      done();
    });
  });

  it(" should navigate to correct country url when clicking on the country name", (done) => {
    moxios.install();
    moxios.stubRequest('/api/countries_health_indicator_scores?categoryId=&phase=', {
      status: 200,
      response: responseData
    });
    moxios.wait(() => {
      wrapper.findAll(".countries-list-details-country").at(0).find(".country-name").trigger('click');
      expect(wrapper.vm.$route.path).to.equal(`/country_profile/${responseData.countryHealthScores[0].countryId}`);
      done();
    });
  });
});