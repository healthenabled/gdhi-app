import { shallow, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import CountryProfile from  "../../src/components/countryProfile/country-profile.js";
import moxios from 'moxios';
import * as pdfHelper from "../../src/components/pdfHelper/pdf-generate-scorecard.js";
import sinon from 'sinon';

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

 let benchmarkData = {
  "1":{
     "benchmarkScore":3,
     "benchmarkValue":"Above"
  },
  "2":{
     "benchmarkScore":3,
     "benchmarkValue":"Below"
  },
  "3":{
     "benchmarkScore":4,
     "benchmarkValue":"At"
  },
  "4":{
     "benchmarkScore":3,
     "benchmarkValue":"At"
  },
  "5":{
     "benchmarkScore":4,
     "benchmarkValue":"Below"
  },
  "6":{
     "benchmarkScore":4,
     "benchmarkValue":"At"
  },
  "7":{
     "benchmarkScore":3,
     "benchmarkValue":"Below"
  },
  "8":{
     "benchmarkScore":3,
     "benchmarkValue":"Below"
  },
  "9":{
     "benchmarkScore":4,
     "benchmarkValue":"Below"
  },
  "10":{
     "benchmarkScore":4,
     "benchmarkValue":"At"
  },
  "11":{
     "benchmarkScore":4,
     "benchmarkValue":"At"
  },
  "12":{
     "benchmarkScore":3,
     "benchmarkValue":"At"
  },
  "13":{
     "benchmarkScore":4,
     "benchmarkValue":"Below"
  },
  "14":{
     "benchmarkScore":4,
     "benchmarkValue":"Below"
  },
  "15":{
     "benchmarkScore":4,
     "benchmarkValue":"Below"
  },
  "16":{
     "benchmarkScore":4,
     "benchmarkValue":"At"
  },
  "17":{
     "benchmarkScore":4,
     "benchmarkValue":"At"
  },
  "18":{
     "benchmarkScore":4,
     "benchmarkValue":"Below"
  },
  "19":{
     "benchmarkScore":3,
     "benchmarkValue":"At"
  }
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

  it("should call generateScorecard with the healthindicator data", (done) => {
    moxios.wait(() => {
      var mockFn = sinon.stub(pdfHelper, 'generateScorecard').callsFake(() => { });
      wrapper.find(".download-btn").trigger("click");
      var firstArgument = mockFn.getCall(0).args[0];
      expect(firstArgument).to.deep.equal(healthIndicatorData);
      done();
    });
  });

  it("should load the benchmark data when the benchmark dropdown is changed", (done) => {
    moxios.wait(() => {
      wrapper.findAll('.benchmarkDropDown option').at(1).element.selected = true 
      wrapper.find('.benchmarkDropDown').trigger('change');
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: benchmarkData
        }).then(() => {
          expect(wrapper.vm.benchmarkData).to.deep.equal(benchmarkData);
          expect(wrapper.findAll(".benchmark-score").at(0).text()).to.equal("Benchmark : " + benchmarkData["1"].benchmarkScore.toString());
          expect(wrapper.findAll(".benchmarkCompare").at(0).text()).to.equal(benchmarkData["1"].benchmarkValue + " Avg.");
          done();
        });
      })
    });
  });

  it("should reset the benchmark data to empty object when no value is selected", (done) => {
    moxios.wait(() => {
      wrapper.findAll('.benchmarkDropDown option').at(0).element.selected = true 
      wrapper.find('.benchmarkDropDown').trigger('change');
      moxios.wait(() => {
        expect(wrapper.vm.benchmarkData).to.deep.equal({});
        expect(wrapper.findAll(".benchmark-score").length).to.equal(0);
        done();
      })
    });
  });

  it("should load the benchmark data when the benchmark dropdown is changed", (done) => {
    let notifier = sinon.spy();
    wrapper.vm.$notify = notifier;
    moxios.wait(() => {
      wrapper.findAll('.benchmarkDropDown option').at(1).element.selected = true; 
      wrapper.find('.benchmarkDropDown').trigger('change');
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {}
        }).then(() => {
          expect(wrapper.vm.benchmarkData).to.deep.equal({});
          expect(wrapper.findAll(".benchmark-score").length).to.equal(0);
          sinon.assert.calledWith(notifier,
            {
              group: "custom-template",
              title: 'No Data',
              text: 'No benchmark data found for selected phase',
              type: 'warn'}
          );
          done();
        });
      })
    });
  });
  it("should call error notifier when the benchmark API call is failed",(done) => {
    let errResp = {
      status: 500,
      response: { message: 'problem' },
    };
    let notifier = sinon.spy();
    wrapper.vm.$notify = notifier;
    moxios.wait(() => {
      wrapper.findAll('.benchmarkDropDown option').at(1).element.selected = true; 
      wrapper.find('.benchmarkDropDown').trigger('change');
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.reject(errResp);
        moxios.wait(() => {
          expect(wrapper.vm.benchmarkData).to.deep.equal({});
          expect(wrapper.findAll(".benchmark-score").length).to.equal(0);
          sinon.assert.calledWith(notifier,
            {
              group: "custom-template",
              title: 'Server Error',
              text: 'Unable to load benchmark data. Please try after sometime',
              type: 'error'}
          );
          done();
        });
      });
    });
  });
  afterEach(() => {
    moxios.uninstall();
  })
});
