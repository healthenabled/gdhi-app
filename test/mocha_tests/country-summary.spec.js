import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import CountrySummary from  "../../src/components/countrySummary/country-summary.js";
import moxios from 'moxios';

describe ("Country Summary ", () => {
  let wrapper;
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();
  let responseData = {
    "countryId":"SGP",
    "countryName":"Singapore",
    "countryAlpha2Code":"SG",
    "summary":"sdv",
    "contactName":"k",
    "contactDesignation":"sldjgfhv",
    "contactOrganization":"dfg",
    "contactEmail":"kjb@sdgnkjs.com",
    "dataFeederName":"szdjk",
    "dataFeederRole":"kg",
    "dataFeederEmail":"sgf@saf.com",
    "dataApproverName":"k",
    "dataApproverRole":"kkh",
    "dataApproverEmail":"khk",
    "collectedDate":"2018-11-12",
    "resources":[
       "sdfsd"
    ]
 };
 beforeEach(() => {
  moxios.install();
  wrapper = mount(CountrySummary, {
    localVue,
    router
  });
 })
  it("should return the country data after the API call is made", (done) => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({status: 200 ,response: responseData}).then(() => {
        expect(wrapper.vm.countrySummaries).to.deep.equal(responseData);
        done();
      });
    });
  });
  it("should update the html based on the data recieved", (done) => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({status: 200 ,response: responseData}).then(() => {
        expect(wrapper.find(".country-summary-link").text()).to.equal(responseData.contactName + ",");
        expect(wrapper.find(".country-designation").text()).to.equal(responseData.contactDesignation + ",");
        expect(wrapper.find(".country-org").text()).to.equal(responseData.contactOrganization);
        expect(wrapper.find(".country-text").text()).to.equal(responseData.summary);
        expect(wrapper.findAll(".country-resource-link").length).to.equal(responseData.resources.length);
        expect(wrapper.find(".link-blue").attributes().href).to.equal('mailto:' + responseData.contactEmail);
        done();
      });
    });
  });
  it("should execute catch block if the API call is failed", (done) => {
    let errResp = {
      status: 500,
      response: { message: 'problem' },
    };
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.reject(errResp);
      moxios.wait(()=> {
        expect(wrapper.vm.error).to.deep.equal(errResp.response.message);
        done();
      });      
    });
  });
  afterEach(() => {
    moxios.uninstall();
  })
})