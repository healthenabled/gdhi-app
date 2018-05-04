import { shallow, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import IndicatorPanel from  "../../src/components/indicatorPanel/indicator-panel.js";
import moxios from 'moxios';

describe ("Indicator Panel ", () => {
  let wrapper;
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();
  let overallScoreData = {
    "overAllScore": 4,
    "categories": [{
      "categoryId": 1,
      "categoryName": "c1",
      "overallScore": 3.33,
      "phase": 4
    },
      {
        "categoryId": 2,
        "categoryName": "c2",
        "overallScore": 3.33,
        "phase": 4
      }
    ]
  };
  window.appProperties = {
    getCategoryFilter: function() {
      return '';
    },
    getPhaseFilter: function() {
      return '';
    }
  }
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest('/api/global_health_indicators?categoryId=&phase=', {
      status: 200,
      response: overallScoreData
    });
    wrapper = shallow(IndicatorPanel, {
      localVue,
      router
    });
  })
  it("should update the variables with indicator data for the global", (done) => {
    moxios.wait(() => {
      let outputData = {
        overallCountryScore: overallScoreData.overAllScore,
        categories: overallScoreData.categories,
      }
      expect(wrapper.vm.globalHealthIndicators).to.deep.equal(outputData);
      expect(wrapper.vm.showCountryDetail).to.equal(false);
      expect(wrapper.vm.isNoGlobalHealthIndicators).to.equal(false);
      done();
    })  
  });
  afterEach(() => {
    moxios.uninstall(); 
  });
})