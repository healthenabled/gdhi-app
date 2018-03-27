import axios from 'axios';

export default ({
  loadSearchData(list, selectCallBack) {
    return {
      data: list,
      getValue: 'name',
      list: {
        match: { enabled: true },
        onChooseEvent: selectCallBack,
      },
    };
  },
  loadCountries() {
    return axios.get('/api/countries');
  },
});
