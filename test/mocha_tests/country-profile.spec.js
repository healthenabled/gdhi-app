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
             },
             {
                "id":1,
                "code":"1",
                "name":"Digital health prioritized at the national level through dedicated bodies / mechanisms for governance",
                "indicatorDescription":"Does the country have a separate department / agency / national working group for digital health?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":2,
                "code":"2",
                "name":"Digital Health prioritized at the national level through planning",
                "indicatorDescription":"Is digital health included and budgeted for in national health or relevant national strategies and/or plan(s)?",
                "score":2,
                "supportingText":"afdsadf",
                "scoreDescription":"There is some discussion of inclusion of digital health in national health or other relevant national strategies or plans. Proposed language for inclusion of digital health in national health or relevant national strategies and/or plans has been made and is under review."
             },
             {
                "id":2,
                "code":"2",
                "name":"Digital Health prioritized at the national level through planning",
                "indicatorDescription":"Is digital health included and budgeted for in national health or relevant national strategies and/or plan(s)?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             }
          ]
       },
       {
          "id":2,
          "name":"Strategy and Investment",
          "overallScore":3.5,
          "phase":4,
          "indicators":[
             {
                "id":3,
                "code":"3",
                "name":"National eHealth/ Digital Health Strategy or Framework",
                "indicatorDescription":"Does the country have an eHealth or digital health strategy or framework and a costed digital health plan?",
                "score":4,
                "supportingText":"adfsdf",
                "scoreDescription":"National digital health strategy and costed plan partially implemented with resources to ensure full implementation"
             },
             {
                "id":3,
                "code":"3",
                "name":"National eHealth/ Digital Health Strategy or Framework",
                "indicatorDescription":"Does the country have an eHealth or digital health strategy or framework and a costed digital health plan?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":4,
                "code":"4",
                "name":"Public funding for digital health",
                "indicatorDescription":"What is the estimated percent (%) of the annual public spending on health committed to digital health?",
                "score":3,
                "supportingText":"dsgsd",
                "scoreDescription":"1-3%"
             },
             {
                "id":4,
                "code":"4",
                "name":"Public funding for digital health",
                "indicatorDescription":"What is the estimated percent (%) of the annual public spending on health committed to digital health?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             }
          ]
       },
       {
          "id":3,
          "name":"Legislation, Policy, and Compliance",
          "overallScore":2.75,
          "phase":3,
          "indicators":[
             {
                "id":5,
                "code":"5",
                "name":"Legal Framework for Data Protection (Security)",
                "indicatorDescription":"Is there a law on data security (storage, transmission, use) that is relevant to digital health?",
                "score":3,
                "supportingText":"adf",
                "scoreDescription":"There is a law on data security (storage, transmission, use) that is relevant to digital health that has been passed, but has not yet been fully implemented."
             },
             {
                "id":5,
                "code":"5",
                "name":"Legal Framework for Data Protection (Security)",
                "indicatorDescription":"Is there a law on data security (storage, transmission, use) that is relevant to digital health?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":6,
                "code":"6",
                "name":"Laws or Regulations for privacy, confidentiality and acess to health information (Privacy)",
                "indicatorDescription":"Is there a law to protect individual privacy, governing ownership, access and sharing of individually identifiable digital health data ?",
                "score":4,
                "supportingText":"sdgadf",
                "scoreDescription":"There is a law to protect individual privacy, governing ownership, access and sharing of individually identifiable digital health data that has been implemented, but not consistenly enforced."
             },
             {
                "id":6,
                "code":"6",
                "name":"Laws or Regulations for privacy, confidentiality and acess to health information (Privacy)",
                "indicatorDescription":"Is there a law to protect individual privacy, governing ownership, access and sharing of individually identifiable digital health data ?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":7,
                "code":"7",
                "name":"Protocol for regulating or certifying devices and/or digital health services",
                "indicatorDescription":"Are there protocols, policies, frameworks or accepted processes governing the clinical and patient care use of connected medical devices and digital health services (e.g. telemedicine, applications), particularly in relation to safety, data integrity and quality of care?",
                "score":2,
                "supportingText":"adfdsd",
                "scoreDescription":"Protocols, policies, frameworks or accepted processes governing the clinical and patient care use of connected medical devices and digital health services (e.g. telemedicine, applications), particularly in relation to safety, data integrity and quality of care have been proposed and are under review."
             },
             {
                "id":7,
                "code":"7",
                "name":"Protocol for regulating or certifying devices and/or digital health services",
                "indicatorDescription":"Are there protocols, policies, frameworks or accepted processes governing the clinical and patient care use of connected medical devices and digital health services (e.g. telemedicine, applications), particularly in relation to safety, data integrity and quality of care?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":8,
                "code":"8",
                "name":"Cross-border data security and sharing",
                "indicatorDescription":"Are there protocols, policies, frameworks or accepted processes in place to support secure cross-border data exchange and storage? This includes health-related data coming into a country, going out of a country, and/or being used in a country related to an individual from another country.",
                "score":2,
                "supportingText":"dfsdg",
                "scoreDescription":"Protocols, policies, frameworks or accepted processes for cross boarder data exchange and storage have been proposed and are under review."
             },
             {
                "id":8,
                "code":"8",
                "name":"Cross-border data security and sharing",
                "indicatorDescription":"Are there protocols, policies, frameworks or accepted processes in place to support secure cross-border data exchange and storage? This includes health-related data coming into a country, going out of a country, and/or being used in a country related to an individual from another country.",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             }
          ]
       },
       {
          "id":4,
          "name":"Workforce",
          "overallScore":3.5,
          "phase":4,
          "indicators":[
             {
                "id":9,
                "code":"9",
                "name":"Digital health integrated in health and related professional pre-service training (prior to deployment)",
                "indicatorDescription":"Is digital health part of curriculum for health and health-related support professionals in training, in general?",
                "score":3,
                "supportingText":"dgsd",
                "scoreDescription":"Digital health curriculum implementation underway covering an estimated 0-25% of health professionals in pre-service training."
             },
             {
                "id":9,
                "code":"9",
                "name":"Digital health integrated in health and related professional pre-service training (prior to deployment)",
                "indicatorDescription":"Is digital health part of curriculum for health and health-related support professionals in training, in general?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":20,
                "code":"9a",
                "name":"Digital health integrated in health and related professional pre-service training (prior to deployment)",
                "indicatorDescription":"Specifically, is digital health part of curriculum for doctors/physicians in medical training?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":21,
                "code":"9b",
                "name":"Digital health integrated in health and related professional pre-service training (prior to deployment)",
                "indicatorDescription":"Specifically, is digital health part of curriculum for nurses in pre-service training?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":22,
                "code":"9c",
                "name":"Digital health integrated in health and related professional pre-service training (prior to deployment)",
                "indicatorDescription":"Specifically, is digital health part of curriculum for health and health-related support professionals in training for community health workers?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":10,
                "code":"10",
                "name":"Digital health integrated in health and related professional in-service training (after deployment)",
                "indicatorDescription":"Is digital health part of curriculum for health and health-related support professionals in the workforce (as defined below)? [Defined as community health workers, nurses, doctors, allied health, health managers/administrators, and technologists]",
                "score":4,
                "supportingText":"sdgsfg",
                "scoreDescription":"Digital health curriculum is implemented as part of in-service (continuing edication) training for 50-75% health professionals in the workforce."
             },
             {
                "id":10,
                "code":"10",
                "name":"Digital health integrated in health and related professional in-service training (after deployment)",
                "indicatorDescription":"Is digital health part of curriculum for health and health-related support professionals in the workforce (as defined below)? [Defined as community health workers, nurses, doctors, allied health, health managers/administrators, and technologists]",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":23,
                "code":"10a",
                "name":"Digital health integrated in health and related professional in-service training (after deployment)",
                "indicatorDescription":"Specifically, is digital health part of curriculum for doctors/physicians in the workforce?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":24,
                "code":"10b",
                "name":"Digital health integrated in health and related professional in-service training (after deployment)",
                "indicatorDescription":"Specifically, is digital health part of curriculum for nurses in the workforce?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":25,
                "code":"10c",
                "name":"Digital health integrated in health and related professional in-service training (after deployment)",
                "indicatorDescription":"Specifically, is digital health part of curriculum for community health workers in the workforce?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":11,
                "code":"11",
                "name":"Training of digital health work force",
                "indicatorDescription":"Is training in digital health / health informatics / health information systems / biomedical informatics degree programs (in either public or private institutions) producing trained digital health workers?",
                "score":4,
                "supportingText":"sdgsfg",
                "scoreDescription":"Trained digital health professionals available and deployed, but essential personnel gaps remain."
             },
             {
                "id":11,
                "code":"11",
                "name":"Training of digital health work force",
                "indicatorDescription":"Is training in digital health / health informatics / health information systems / biomedical informatics degree programs (in either public or private institutions) producing trained digital health workers?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":26,
                "code":"11a",
                "name":"Training of digital health work force",
                "indicatorDescription":"Specifically, is training in health and/or biomedical informatics (in either public or private institutions) producing trained informaticists or health information systems specialists?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":12,
                "code":"12",
                "name":"Maturity of public sector digital health professional careers",
                "indicatorDescription":"Are there public sector professional titles and career paths in digital health?",
                "score":3,
                "supportingText":"sdgsdgf",
                "scoreDescription":"Digital health staff roles and responsibilities are mapped to the government's workforce and career schemes and 25-50% of needed public sector digital health workforce in place."
             },
             {
                "id":12,
                "code":"12",
                "name":"Maturity of public sector digital health professional careers",
                "indicatorDescription":"Are there public sector professional titles and career paths in digital health?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             }
          ]
       },
       {
          "id":5,
          "name":"Standards and Interoperability",
          "overallScore":3.0,
          "phase":3,
          "indicators":[
             {
                "id":13,
                "code":"13",
                "name":"National digital health architecture and/or health information exchange",
                "indicatorDescription":"Is there a national digital health (eHealth) architectural framework and/or health information exchange (HIE) established?",
                "score":3,
                "supportingText":"sfdgsfg",
                "scoreDescription":"The HIE is operable and provides core functions, such as authentication, translation, storage and warehousing function, guide to what data is available and how to access it, and data interpretation."
             },
             {
                "id":13,
                "code":"13",
                "name":"National digital health architecture and/or health information exchange",
                "indicatorDescription":"Is there a national digital health (eHealth) architectural framework and/or health information exchange (HIE) established?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":14,
                "code":"14",
                "name":"Health information standards",
                "indicatorDescription":"Are there digital health / health information standards for data exchange, transmission, messaging, security, privacy, and hardware?",
                "score":3,
                "supportingText":"sdfsdf",
                "scoreDescription":"Digital health / health information standards for data exchange, transmission, messaging, security, privacy, and hardware have been published and disseminated in the country under the government’s leadership."
             },
             {
                "id":14,
                "code":"14",
                "name":"Health information standards",
                "indicatorDescription":"Are there digital health / health information standards for data exchange, transmission, messaging, security, privacy, and hardware?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             }
          ]
       },
       {
          "id":6,
          "name":"Infrastructure",
          "overallScore":3.5,
          "phase":4,
          "indicators":[
             {
                "id":15,
                "code":"15",
                "name":"Network readiness",
                "indicatorDescription":"Extract the WEF Network Readiness Index score",
                "score":3,
                "supportingText":"sdgfsfg",
                "scoreDescription":"WEF score (>4.0 - 5.0)"
             },
             {
                "id":15,
                "code":"15",
                "name":"Network readiness",
                "indicatorDescription":"Extract the WEF Network Readiness Index score",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":16,
                "code":"16",
                "name":"Planning and support for ongoing digital health infrastructure maintenance",
                "indicatorDescription":"Is there an articulated plan for supporting digital health infrastructure (including equipment- computers/ tablets/ phones, supplies, software, devices, etc.) provision and maintenance?",
                "score":4,
                "supportingText":"sdvgsf",
                "scoreDescription":"A plan for supporting digital health infrastructure (including equipment- computers/ tablets/ phones, supplies, software, devices, etc.) provision and maintenance has been implemented partially and consistently with estimated 25-50% of necessary digital health infrastructure needed in public healthcare service sector available and in use."
             },
             {
                "id":16,
                "code":"16",
                "name":"Planning and support for ongoing digital health infrastructure maintenance",
                "indicatorDescription":"Is there an articulated plan for supporting digital health infrastructure (including equipment- computers/ tablets/ phones, supplies, software, devices, etc.) provision and maintenance?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             }
          ]
       },
       {
          "id":7,
          "name":"Services and Applications",
          "overallScore":3.3333333333333335,
          "phase":4,
          "indicators":[
             {
                "id":17,
                "code":"17",
                "name":"Nationally scaled digital health systems",
                "indicatorDescription":"Public sector priorities (eg. 14 domains included in ISO TR 14639) are supported by nationally-scaled digital health systems. (Use separate worksheet to determine the country\"s specified priority areas, whether digital systems are in place, and whether those systems are national-scale.)  [eg. Country X chooses 4 priority areas, uses digital systems to address 2 of the 4, with only 1 being at national scale, receives a score of 25%.]",
                "score":4,
                "supportingText":"sdgsdfg",
                "scoreDescription":"The majority, but not all national priority areas (50-75% of priority areas) supported by scaled digital health systems."
             },
             {
                "id":17,
                "code":"17",
                "name":"Nationally scaled digital health systems",
                "indicatorDescription":"Public sector priorities (eg. 14 domains included in ISO TR 14639) are supported by nationally-scaled digital health systems. (Use separate worksheet to determine the country\"s specified priority areas, whether digital systems are in place, and whether those systems are national-scale.)  [eg. Country X chooses 4 priority areas, uses digital systems to address 2 of the 4, with only 1 being at national scale, receives a score of 25%.]",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":18,
                "code":"18",
                "name":"Digital identity management of service providers, administrators, and facilities for digital health, including location data for GIS mapping",
                "indicatorDescription":"Are health system registries of uniquely identifiable providers, administrators, and public facilities (and private if applicable) available, accessible and current? Is the data geotagged to enable GIS mapping?",
                "score":3,
                "supportingText":"sdgsdgfsdg",
                "scoreDescription":"Health system registries of uniquely identifiable providers, administrators, and public facilities (and private if applicable) are available for use, but incomplete, partially available, used sporadically, and irregularly maintained."
             },
             {
                "id":18,
                "code":"18",
                "name":"Digital identity management of service providers, administrators, and facilities for digital health, including location data for GIS mapping",
                "indicatorDescription":"Are health system registries of uniquely identifiable providers, administrators, and public facilities (and private if applicable) available, accessible and current? Is the data geotagged to enable GIS mapping?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":19,
                "code":"19",
                "name":"Digital identity management of individuals for health",
                "indicatorDescription":"Are secure registries or a master patient index of uniquely identifiable individuals available, accessible and current for use for health-related purposes?",
                "score":3,
                "supportingText":"sdgsfg",
                "scoreDescription":"A secure registry exists, is available and in active use and includes <25% of the relevant population."
             },
             {
                "id":19,
                "code":"19",
                "name":"Digital identity management of individuals for health",
                "indicatorDescription":"Are secure registries or a master patient index of uniquely identifiable individuals available, accessible and current for use for health-related purposes?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":27,
                "code":"19a",
                "name":"Digital identity management of individuals for health",
                "indicatorDescription":"Specifically, is there a secure master patient index of uniquely identifiable individuals available, accessible and current for use for health-related purposes?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":28,
                "code":"19b",
                "name":"Digital identity management of individuals for health",
                "indicatorDescription":"Specifically, is there a secure birth registry of uniquely identifiable individuals available, accessible and current for use for health-related purposes?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":29,
                "code":"19c",
                "name":"Digital identity management of individuals for health",
                "indicatorDescription":"Specifically, is there a secure death registry of uniquely identifiable individuals available, accessible and current for use for health-related purposes?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             },
             {
                "id":30,
                "code":"19d",
                "name":"Digital identity management of individuals for health",
                "indicatorDescription":"Specifically, is there a secure immunization registry of uniquely identifiable individuals available, accessible and current for use for health-related purposes?",
                "score":null,
                "supportingText":"",
                "scoreDescription":"Not Available or Not Applicable"
             }
          ]
       }
    ],
    "countryPhase":4,
    "collectedDate":"January 2018"
 };
  it("should populate the data after successfull API call", (done) => {
    moxios.install();
    wrapper = shallow(CountryProfile, {
      localVue,
      router
    });
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.resolve({data: healthIndicatorData});
      moxios.wait(() => {
        expect(wrapper.vm.healthIndicatorData).to.deep.equal(healthIndicatorData);
        expect(wrapper.vm.flagSrc).to.deep.equal(`/static/img/flags/${healthIndicatorData.countryAlpha2Code.toLowerCase()}.svg`);
        wrapper.vm.initialise();
        wrapper.vm.healthIndicatorData.categories.forEach((category) => {
          expect(category['showCategory']).to.equal(false);
        });
        done();
      })
    });
    moxios.uninstall();
  });
  it("should have the appropriate html elements based on the data", (done) => {
    moxios.install();
    wrapper = shallow(CountryProfile, {
      localVue,
      router
    });
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.resolve({data: healthIndicatorData});
      moxios.wait(() => {
        expect(wrapper.find(".country-name").text()).to.equal(healthIndicatorData.countryName);
        expect(wrapper.find("#collected-date").text()).to.equal(`As on ${healthIndicatorData.collectedDate}`);
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
      })
    });
    moxios.uninstall();
  });
  it("should updated the showCategory when the category is clicked", (done) => {
    moxios.install();
    wrapper = shallow(CountryProfile, {
      localVue,
      router
    });
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.resolve({data: healthIndicatorData});
      moxios.wait(() => {
        const firstCategory = wrapper.findAll(".category-bar").at(0);
        firstCategory.find(".sub-header").trigger("click");
        expect(wrapper.vm.healthIndicatorData.categories[0].showCategory).to.equal(true);
        firstCategory.find(".sub-header").trigger("click");
        expect(wrapper.vm.healthIndicatorData.categories[0].showCategory).to.equal(false);
        done();
      })
    });
    moxios.uninstall();
  });
});