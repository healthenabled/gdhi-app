import axios from 'axios'

export default ({
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
