import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import moxios from 'moxios';
import DevelopmentIndicators from "../../src/components/developmentIndicators/development-indicators.js";
import Obj from  "../../src/common/indicator-http-requests.js";

describe("Development Indicators", () => {
  let wrapper;
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  let responseData = {
    gniPerCapita: 1000,
    totalPopulation: 1000000,
    adultLiteracy: 70.22,
    doingBusinessIndex: 22.22,
    lifeExpectancy: 60,
    healthExpenditure: 22.23,
    totalNcdDeathsPerCapita: 22.2,
    under5Mortality: 22
  };
 const developmentIndicatorsData = [
  {
    CONTEXT: {
      gniPerCapita: Obj.getGNIPerCapitaInKilo(responseData.gniPerCapita),
      totalPopulation: Obj.getTotalPopulationInMillion(responseData.totalPopulation),
      adultLiteracyRate:
        Obj.getInPercenatge(responseData.adultLiteracy),
      easeOfDoingBusinessIndex: Obj.getValue(responseData.doingBusinessIndex),
    },
  },
  {
    HEALTH: {
      lifeExpectancy: Obj.getValue(responseData.lifeExpectancy),
      healthExpenditure: Obj.getInPercenatge(responseData.healthExpenditure),
      causeOfDeath:
        Obj.getInPercenatge(responseData.totalNcdDeathsPerCapita),
      mortalityRate: Obj.getValue(responseData.under5Mortality),
    },
  },
];
beforeEach(() => {
  moxios.install();
  wrapper = mount(DevelopmentIndicators, {
    localVue,
    router
  });
})
  it(" should set the local variable development indicators after the successful api call", (done) => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({status: 200, response: responseData}).then(() => {
        expect(wrapper.vm.developmentIndicators).to.deep.equal(developmentIndicatorsData);
        done();
      });
    });
  });
  it(" should render the html elements based on the response ", (done) => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({status: 200, response: responseData}).then(() => {
        expect(wrapper.findAll(".category").length).to.equal(developmentIndicatorsData.length);
        const firstElement = wrapper.findAll(".category").at(0);
        expect(firstElement.find(".header-bold").text()).to.equal(Object.keys(developmentIndicatorsData[0])[0].toLowerCase());
        expect(firstElement.findAll(".indicator").length).to.equal(Object.keys(developmentIndicatorsData[0]["CONTEXT"]).length);
        expect(firstElement.findAll(".indicator").at(0).find(".copy-grey").text()).to.equal(Object.keys(developmentIndicatorsData[0]["CONTEXT"])[0]);
        expect(firstElement.findAll(".indicator").at(0).find(".highlight-text").text()).to.equal(Object.values(developmentIndicatorsData[0]["CONTEXT"])[0]);
        done();
      });
    });
  });
  afterEach(() => {
    moxios.uninstall();
  })
});
