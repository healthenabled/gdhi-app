import countryHelper from '../../../../src/common/country'

describe('should test country utils', () => {
  xit('should validate ', () => {
    var validator = countryHelper.countryNameValidator
    let countries = [
      {id: "IND", name: "INDIA"},
      {id: "JPN", name: "Japan"},
      {id: "SRL", name: "SriLanka"}
    ];
    expect(validator.validate("ind", countries)).to.equal(false)
    expect(validator.validate("India", countries)).to.equal(false)
    expect(validator.validate("", countries)).to.equal(false)
    expect(validator.validate(null, countries)).to.equal(false)
    expect(validator.validate("INDIA", countries)).to.equal(true)
  })
})
