import Vue from 'vue';
import {shallow} from "@vue/test-utils";
import EditQuestionnaire from "../../src/components/healthIndicatorQuestionnaire/edit-questionaire.js";
import VueRouter from 'vue-router';
import moxios from "moxios";
import sinon from "sinon";
import VeeValidate from "vee-validate";

describe("EditQuestionaire",()=>{
  let component;
  const router = new VueRouter();

  beforeEach(()=> {
    Vue.use(VeeValidate);
    const $route = { path: 'test', params:{countryUUID: 'random-uuid'} }
    component = shallow(EditQuestionnaire, {
      propsData: {
        showEdit: true,
        countrySummary: {countryName:'India',resources: [''],countryId:'some-random-uuid'},
        questionnaire: [],
        healthIndicators: {},
        status: "status",
        isAdmin: false
      },
      router
    });
  });

  it("should contain the edit-questionnaire component", () => {
    expect(component.contains(".health-indicator-questionnaire")).to.equal(true);
  });

  it("should save data as draft", (done) => {
    moxios.install();
    moxios.stubRequest('/api/countries/save', {
      status: 200
    });

    component.vm.saveData('save');

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      expect(request.config.method).to.equal("post");
      expect(request.config.url).to.equal("/api/countries/save");

      let requestParams = JSON.parse(request.config.data);
      expect(requestParams.countryId).to.equal('some-random-uuid');
      done()
    });
    moxios.uninstall();
  });

  it("should show publish confirm after validation is done", (done) => {
    moxios.install();

    component.vm.questionnaire = [{
      categoryId: 1,
      categoryName: 'some category',
      showCategory: false
    },{
      categoryId: 2,
      categoryName: 'some other category',
      showCategory: false
    }];

    let getConfirmationDialog = sinon.spy();
    component.vm.getConfirmationDialog = getConfirmationDialog;
    let publishData = sinon.spy();
    component.vm.publish = publishData;

    sinon.stub(component.vm.$validator, 'validateAll').returns(new Promise((resolve, reject) => resolve(true)));
    component.vm.validate('publish');

    moxios.wait(() => {
      expect(component.vm.questionnaire[0].showCategory).to.be.true;
      expect(component.vm.questionnaire[1].showCategory).to.be.true;
      sinon.assert.calledWith(getConfirmationDialog,
        { message: 'You are about to publish digital health index form for India, this cannot be reverted. Do you want' +
        ' to continue?',
          callBackMethod: publishData,
          callBackArgs: []
        });
      done();
    });

    moxios.uninstall();
  });

  it("should not show publish confirm if data is not valid", (done) => {
    moxios.install();

    let getConfirmationDialog = sinon.spy();
    component.vm.getConfirmationDialog = getConfirmationDialog;
    let notifier = sinon.spy();
    component.vm.$notify = notifier;

    sinon.stub(component.vm.$validator, 'validateAll').returns(new Promise((resolve, reject) => resolve(false)));
    component.vm.validate('publish');

    moxios.wait(() => {
      sinon.assert.notCalled(getConfirmationDialog);
      sinon.assert.calledWith(notifier,
        {
          group: 'custom-template',
          title: 'Error',
          text: 'Please correct the highlighted fields.',
          type: 'error'}
      );
      done();
    });
    moxios.uninstall();
  });

  it("should submit data when data is valid", (done) => {
    moxios.install();

    let saveData = sinon.spy();
    component.vm.saveData = saveData;

    sinon.stub(component.vm.$validator, 'validateAll').returns(new Promise((resolve, reject) => resolve(true)));
    component.vm.validate('submit');

    moxios.wait(() => {
      sinon.assert.calledOnce(saveData);
      done();
    });

    moxios.uninstall();
  });

  it("should not submit data when data is invalid", (done) => {
    moxios.install();

    let saveData = sinon.spy();
    component.vm.saveData = saveData;
    let notifier = sinon.spy();
    component.vm.$notify = notifier;

    sinon.stub(component.vm.$validator, 'validateAll').returns(new Promise((resolve, reject) => resolve(false)));
    component.vm.validate('submit');

    moxios.wait(() => {
      sinon.assert.notCalled(saveData);
      sinon.assert.calledWith(notifier,
        {
          group: 'custom-template',
          title: 'Error',
          text: 'Please correct the highlighted fields.',
          type: 'error'}
      );
      done();
    });

    moxios.uninstall();
  });

  it("should call getConfirmationDialog on click of Reject with the given params", () =>{
    let getConfirmationDialog = sinon.spy();
    let deleteData = sinon.spy();
    component.vm.deleteData = deleteData;
    component.vm.getConfirmationDialog = getConfirmationDialog;
    component.vm.reject();

    sinon.assert.calledWith(getConfirmationDialog,
      { message: 'You are about to reject health index form for India, this cannot be reverted. Do you want to continue?',
        callBackMethod: deleteData,
        callBackArgs: []
      })
  });

  it('should call delete api and redirect to admin page',  (done) => {
    moxios.install();
    let routerPush = sinon.spy(router, 'push');

    component.vm.deleteData();

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      expect(request.config.method).to.equal("delete");
      let expectedUUID = component.vm.$route.params.countryUUID;
      expect(request.config.url).to.equal(`/api/countries/${expectedUUID}/delete`);

      request.respondWith({
        status: 200,
      }).then(() => {
        sinon.assert.calledWith(routerPush,{ path: `/admin` });
        done();
      });
    });
    moxios.uninstall();
  });

  it('should call delete api and notify with error message on server error',  (done) => {
    moxios.install();

    let notifier = sinon.spy();
    component.vm.$notify = notifier;

    component.vm.deleteData();

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      expect(request.config.method).to.equal("delete");
      let expectedUUID = component.vm.$route.params.countryUUID;
      expect(request.config.url).to.equal(`/api/countries/${expectedUUID}/delete`);

      request.respondWith({
        status: 500,
      }).then(() => {
        sinon.assert.calledWith(notifier,
          {
            group: 'custom-template',
            title: 'Error',
            text: 'Something has gone wrong. Please refresh the Page!',
            type: 'error'}
            );
        done();
      });
    });
    moxios.uninstall();
  });
});
