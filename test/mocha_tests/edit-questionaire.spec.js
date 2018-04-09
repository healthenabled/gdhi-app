import {shallow} from "@vue/test-utils";
import EditQuestionnaire from "../../src/components/healthIndicatorQuestionnaire/edit-questionaire.js";
import moxios from "moxios";
import sinon from "sinon";


describe("EditQuestionaire",()=>{
  let component;

  beforeEach(()=> {
    component = shallow(EditQuestionnaire, {
      propsData: {
        showEdit: true,
        countrySummary: {resources: [''],countryId:'some-random-uuid'},
        questionnaire: [],
        healthIndicators: {},
        status: "status",
        isAdmin: false
      }
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
});
