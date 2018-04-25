import {shallow} from '@vue/test-utils';
import Map from "../../src/components/landing-map/map.js";
import moxios from "moxios";

describe("Map ", () => {
  let wrapper;
  it(" should fetch phases", (done) => {
    let phaseData = [
      {
        phaseName: "phase1",
        phaseValue: 1
      },
      {
        phaseName: "phase2",
        phaseValue: 2
      }
    ];
    moxios.install();
    moxios.stubRequest('/api/phases', {
      status: 200,
      response: phaseData
    });
    wrapper = shallow(Map);
    wrapper.vm.fetchPhases();

    moxios.wait(() => {
      expect(wrapper.vm.phases).to.deep.equal(phaseData);
      done();
    })
  });
})
