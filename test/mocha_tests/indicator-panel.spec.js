import { shallow, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import IndicatorPanel from  "../../src/components/indicatorPanel/indicator-panel.js";
import moxios from 'moxios';
import sinon from "sinon";

describe("Indicator Panel ", () => {
  let wrapper;
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();
  let overallScoreData = {
    "overAllScore":3,
    "categories":[
      {
        "id":1,
        "name":"Leadership and Governance",
        "overallScore":2.4375,
        "phase":3,
        "indicators":null
      },
      {
        "id":2,
        "name":"Strategy and Investment",
        "overallScore":2.9285714285714284,
        "phase":3,
        "indicators":null
      }
    ]
  };
  let countryData = {
    "countryId":"IND",
    "countryName":"India",
    "countryAlpha2Code":"IN",
    "categories":[
      {
        "id":1,
        "name":"Leadership and Governance",
        "overallScore":1.0,
        "phase":1,
        "indicators":[
          {
            "id":1,
            "code":"1",
            "name":"Digital health prioritized at the national level through dedicated bodies / mechanisms for governance",
            "indicatorDescription":"Does the country have a separate department / agency / national working group for digital health?",
            "score":1,
            "supportingText":"devbox",
            "scoreDescription":"No coordinating body exists and/or nascent governance structure for digital health is constituted on a case-by-case basis."
          },
          {
            "id":2,
            "code":"2",
            "name":"Digital Health prioritized at the national level through planning",
            "indicatorDescription":"Is digital health included and budgeted for in national health or relevant national strategies and/or plan(s)?",
            "score":-1,
            "supportingText":"fdsf",
            "scoreDescription":"Not Available or Not Applicable"
          }
        ]
      }
    ],
    "countryPhase":3,
    "collectedDate":"February 2015"
  }
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

  it("should update the variables with indicator data for the country data", (done) => {
    wrapper.vm.getHealthIndicators('', '1')
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: countryData
      }).then(() => {
        const healthIndicatorsData = {
          countryId: countryData.countryId,
          countryName: countryData.countryName,
          categories: countryData.categories,
          countryPhase: countryData.countryPhase,
        };

        expect(wrapper.vm.healthIndicators).to.deep.equal(healthIndicatorsData);
        expect(wrapper.vm.showCountryDetail).to.equal(true);
        expect(wrapper.vm.isNoGlobalHealthIndicators).to.equal(true);
        done();
      });
    })
  });

  it("should return title based on the filter ", (done) => {
    moxios.wait(() => {
      let returnStr = wrapper.vm.getIndicatorContainerName();
      expect(returnStr).to.deep.equal('State of Digital Health around the world today');

      wrapper.vm.phaseFilter = true;
      returnStr = wrapper.vm.getIndicatorContainerName();
      expect(returnStr).to.deep.equal('Overall');

      wrapper.vm.categoryFilter = true;
      returnStr = wrapper.vm.getIndicatorContainerName();
      expect(returnStr).to.deep.equal(overallScoreData.categories[0].name);

      wrapper.vm.globalHealthIndicators = {"overAllScore":null,"categories":[]};
      returnStr = wrapper.vm.getIndicatorContainerName();
      expect(returnStr).to.deep.equal('No countries available for the selected criteria');
      done();
    })
  });

  it("should push the url when showcountrydetails is called ", (done) => {
    moxios.wait(() => {
      var mockFn = sinon.stub(router, 'push').callsFake(() => { });
      wrapper.vm.showCountryDetails('IND');
      expect(mockFn.getCall(0).args[0]).to.deep.equal({ path: `/country_profile/IND` });
      router.push.restore();
      done();
    })
  });

  it("should push the url when showlistofcountries is called ", (done) => {
    moxios.wait(() => {
      var mockFn = sinon.stub(router, 'push').callsFake(() => { });
      wrapper.vm.showListOfCountries();
      expect(mockFn.getCall(0).args[0]).to.deep.equal({ path: '/country_list' });
      done();
    })
  });
  afterEach(() => {
    moxios.uninstall();
  });
})
