import axios from 'axios'

export default ({
  countryNameValidator: {
    getMessage: field => 'Please select a valid country name.',
    validate (val, countries) {
      return countries.filter(country => country.name && country.name === val).length > 0
    }
  },
  loadSearchData: function (list, selectCallBack) {
    return {
      data: list,
      getValue: 'name',
      list: {
        match: {enabled: true},
        onChooseEvent: selectCallBack
      }
    }
  },
  loadCountries: function () {
    return axios.get('/api/countries')
  }
})
