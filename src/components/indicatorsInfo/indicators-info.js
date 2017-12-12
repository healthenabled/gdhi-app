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
    $('.loading').show()
    self.fetchCategoricalIndicators().then(response => {
      self.categoricalIndicators = response.data
      self.categoryNames = self.getCategoryNames(response.data)
      $('.loading').hide()
    })
  },

  methods: {
    fetchCategoricalIndicators: function () {
      return axios.get('/api/health_indicator_options')
    },

    getCategoryNames: function (categories) {
      return _.uniq(_.map(categories, 'categoryName'))
    }
  }

})
