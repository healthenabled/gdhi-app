import Vue from 'vue'
import indicatorsInfo from './indicators-info.html'
import axios from 'axios'
import _ from 'lodash'

export default Vue.extend({
  template: indicatorsInfo,
  name: 'indicators-info',

  data () {
    return {
      categoricalIndicators: [],
      categoryNames: []

    }
  },

  created () {
    var self = this
    self.fetchCategoricalIndicators().then(response => {
      self.categoricalIndicators = response.data

      self.categoryNames = self.getCategoryNames(response.data)
      console.log(response.data)
    })
  },

  methods: {

    fetchCategoricalIndicators: function () {
      return axios.get('/api/categorical_indicators')
    },

    getCategoryNames: function (categories) {
      return _.uniq(_.map(categories, 'categoryName'))
    }
  }

})
