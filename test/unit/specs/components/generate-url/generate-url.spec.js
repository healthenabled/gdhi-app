import Vue from 'vue'
import generateUrlComp from '@/components/generateUrl/generate_url.js'
import axios from 'axios'
import { mount } from '@vue/test-utils'


describe('Generate URL Component', ()=> {
  let generateUrl
  let sandBox
  before(() => {
    const Constructor = Vue.extend(generateUrlComp);
    generateUrl = new Constructor()
  })
  beforeEach(() => {
    sandBox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandBox.restore()
  })

  it('should display countries onMount', () => {
    const countries = [
        {
            'id':"AFG",
            'name':"Afghanistan",
            'unique_id':"292507e3-e517-4206-ae0d-1590f10f1a07"
        },
        {
            'id':"ALB",
            'name':"Albania",
            'unique_id':"154a09d9-b750-4817-982a-306aacb923f4"
        },
        {
            'id':"DZA",
            'name':"Algeria",
            'unique_id':"8efaf258-a952-4c1a-aff9-cf20c89539d6"
        }
    ]
    const data = {'data':  countries}
    const resolved = new Promise((resolve, reject) => resolve(data))
    sandBox.stub(axios, 'get').returns(resolved)

    generateUrl.loadCountries()
      .then(() => {
        expect(generateUrl.countries).to.have.length(3)
      })
  })

  it('should generate url for slected country',()=>{
    generateUrl.countryUUID = "292507e3-e517-4206-ae0d-1590f10f1a07"
    generateUrl.generateUrl()
    expect(generateUrl.generatedURL).to.contain("/health_indicator_questionnaire/292507e3-e517-4206-ae0d-1590f10f1a07")
  })

  it('should save url generation status for selected country',()=>{
    generateUrl.countryId = "IND";
    const data = {'data':
        {
          countryId : "IND",
          success : true,
          existingStatus: "PUBLISHED"
        }
    };
    const resolved = new Promise((resolve, reject) => resolve(data))
    sandBox.stub(axios, 'post').returns(resolved);

    generateUrl.saveURLGenerationStatus()
      .then((response) => {
        expect(generateUrl.message).to.contain("URL Generated Successfully")
      })
  });

  it('should show error message when any exception occurs in api side',()=>{
    generateUrl.countryId = "IND";
    sandBox.stub(axios, 'post').rejects();

    generateUrl.saveURLGenerationStatus()
      .catch((response) => {
        expect(generateUrl.message).to.contain('Error While Saving the URL Generation Status');
      })
  })


})
