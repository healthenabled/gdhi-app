import {mount} from "@vue/test-utils";
import adminViewFormDetails from "../../src/components/adminViewFormDetails/admin-view-form-details.js";
import VueRouter from 'vue-router';
import moxios from "moxios";
import sinon from "sinon";


describe("AdminViewFormDetails",()=>{
  let component;
  const router = new VueRouter();

  let responseData = {
    "NEW": [{
      "countryName": "India",
      "countryUUID": "1b9f0f33-9c69-4bfc-8730-8bcbb5c06d88",
      "status": "NEW",
      "contactName": "contactName",
      "contactEmail": "email"
    }, {
      "countryName": "Australia",
      "countryUUID": "5a1f8e8c-7ebd-499a-b6b0-015828695796",
      "status": "NEW",
      "contactName": "contactName",
      "contactEmail": "email"
    }],
    "PUBLISHED": [{
      "countryName": "Australia",
      "countryUUID": "5a1f8e8c-7ebd-499a-b6b0-015828695796",
      "status": "PUBLISHED",
      "contactName": "contactName",
      "contactEmail": "email"
    }],
    "DRAFT": [{
      "countryName": "Australia",
      "countryUUID": "5a1f8e8c-7ebd-499a-b6b0-015828695796",
      "status": "DRAFT",
      "contactName": "contactName",
      "contactEmail": "email"
    }],
    "REVIEW_PENDING": [{
      "countryName": "Australia",
      "countryUUID": "5a1f8e8c-7ebd-499a-b6b0-015828695796",
      "status": "REVIEW_PENDING",
      "contactName": "contactName",
      "contactEmail": "email"
    }]
  };

  beforeEach(()=> {
    component = mount(adminViewFormDetails, {
      data : {
        tabs: [
          {id: 0, name:'Awaiting Submission'},
          {id: 1, name:'Review Pending'},
          {id: 2, name:'Live Data'}
        ]

      },
      router
    });
  });

  it("should get admin view form details data",(done) => {
    moxios.install();
    let updateSelected = sinon.spy();
    component.vm.updateSelected = updateSelected;
    component.vm.loadAdminViewFormDetails();

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: responseData
      }).then(() => {
        sinon.assert.calledWith(updateSelected, {id: 0, name:'Awaiting Submission'});
        expect(component.vm.allData).to.equal(responseData);
        done();
      });
    });
    moxios.uninstall();
  });

  it("should call getTabData when updateSelected is called",() => {
    let getTabData = sinon.spy();
    component.vm.getTabData = getTabData;
    component.vm.updateSelected({id: 0, name:'Awaiting Submission'});
    sinon.assert.calledWith(getTabData, {id: 0, name:'Awaiting Submission'});
    expect(component.vm.selectedTab).to.equal(0);
  });


  it("should call openUrl when actionHandler is invoked",() => {
    let openUrl = sinon.spy();
    component.vm.openUrl = openUrl;

    component.vm.actionHandler('Review','some-uuid');
    sinon.assert.calledWith(openUrl, location.origin + "/health_indicator_questionnaire/some-uuid/review");

    component.vm.actionHandler('View Live Data','some-uuid');
    sinon.assert.calledWith(openUrl, location.origin + "/health_indicator_questionnaire/viewPublish/some-uuid");

  });

  it("should populate the table rows when getTabData is called ",() => {
    component.vm.allData = responseData;
    component.vm.getTabData(component.vm.tabs[0]);
    expect(component.vm.tableRows).to.deep.equal([...responseData.NEW , ...responseData.DRAFT] );

    component.vm.getTabData(component.vm.tabs[1]);
    expect(component.vm.tableRows).to.deep.equal(responseData.REVIEW_PENDING);

    component.vm.getTabData(component.vm.tabs[2]);
    expect(component.vm.tableRows).to.deep.equal(responseData.PUBLISHED);


  });

});


