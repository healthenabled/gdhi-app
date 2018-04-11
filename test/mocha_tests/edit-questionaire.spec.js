import {shallow} from "@vue/test-utils";
import EditQuestionnaire from "../../src/components/healthIndicatorQuestionnaire/edit-questionaire.js";
import VueRouter from 'vue-router';
import moxios from "moxios";
import sinon from "sinon";


describe("EditQuestionaire",()=>{
  let component;
  const router = new VueRouter()

  beforeEach(()=> {
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

  it("should set accordians to expanded on publish of data for validations ", () => {
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
    component.vm.publish();

    expect(component.vm.questionnaire[0].showCategory).to.be.true;
    expect(component.vm.questionnaire[1].showCategory).to.be.true;

    sinon.assert.calledOnce(getConfirmationDialog)
  });

  it("should save data and call notify on admin save correction",() => {
    let saveData = sinon.spy();
    let notifier = sinon.spy();

    component.vm.saveData = saveData;
    component.vm.notifier = notifier;

    component.vm.saveCorrection();

    sinon.assert.calledWith(saveData,'saveCorrection');
    sinon.assert.calledWith(notifier,{
      title: 'Success',
      message: 'Form saved successfully!',
      type: 'success'
    });
  });

  it("should call getConfirmationDialog on click of Reject with the given params", () =>{
    let getConfirmationDialog = sinon.spy();
    let deleteData = sinon.spy();
    component.vm.deleteData = deleteData;
    component.vm.getConfirmationDialog = getConfirmationDialog;
    component.vm.reject();

    sinon.assert.calledWith(getConfirmationDialog,
      { message: 'Reject health index form for India, this cannot be reverted',
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
      expect(request.config.method).to.equal("post");
      expect(request.config.url).to.equal("/api/countries/delete");

      let requestParams = JSON.parse(request.config.data);
      expect(requestParams.countryId).to.equal('some-random-uuid');
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
    component.vm.notifier = notifier;

    component.vm.deleteData();

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      expect(request.config.method).to.equal("post");
      expect(request.config.url).to.equal("/api/countries/delete");

      let requestParams = JSON.parse(request.config.data);
      expect(requestParams.countryId).to.equal('some-random-uuid');
      request.respondWith({
        status: 500,
      }).then(() => {
        sinon.assert.calledWith(notifier,
          {
            title: 'Error',
            message: 'Something has gone wrong. Please refresh the Page!',
            type: 'error'}
            );
        done();
      });
    });
    moxios.uninstall();
  });
});
