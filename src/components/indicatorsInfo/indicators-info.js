import Vue from 'vue';
import indicatorsInfo from './indicators-info.html';
import axios from 'axios';
import { uniq } from 'lodash';
import common from '../../common/common'

export default Vue.extend({
  name: 'IndicatorsInfo',

  data() {
    return {
      categoricalIndicators: [],
      categoryNames: [],

    };
  },

  mounted() {
    const self = this;
    common.showLoading();

    self.fetchCategoricalIndicators().then(response => {
      self.categoricalIndicators = response.data;
      self.categoricalIndicators.forEach((category)=> {
        this.$set(category, 'showCategory', true);
      });
      self.categoryNames = self.getCategoryNames(response.data);
      common.hideLoading();
    });
  },

  methods: {
    fetchCategoricalIndicators() {
      return axios.get('/api/health_indicator_options');
    },

    getCategoryNames(categories) {
      return uniq(categories.map((category) => {
        return category.categoryName
      }));
    },
    onCategoryExpand(category) {
      category.showCategory = !category.showCategory;
    },
  },
  template: indicatorsInfo,

});
