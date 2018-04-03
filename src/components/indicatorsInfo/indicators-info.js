import Vue from 'vue';
import indicatorsInfo from './indicators-info.html';
import axios from 'axios';
import _ from 'lodash';

export default Vue.extend({
  name: 'IndicatorsInfo',

  data() {
    return {
      categoricalIndicators: [],
      categoryNames: [],

    };
  },

  created() {
    const self = this;
    const loadingElement = document.querySelector(".loading");
    if(loadingElement)
      loadingElement.style.display = "block";

    self.fetchCategoricalIndicators().then(response => {
      self.categoricalIndicators = response.data;
      self.categoricalIndicators.forEach((category)=> {
        this.$set(category, 'showCategory', true);
      });
      self.categoryNames = self.getCategoryNames(response.data);
      const loadingElement = document.querySelector(".loading");
      if(loadingElement)
        loadingElement.style.display = "none";
    });
  },

  methods: {
    fetchCategoricalIndicators() {
      return axios.get('/api/health_indicator_options');
    },

    getCategoryNames(categories) {
      return _.uniq(_.map(categories, 'categoryName'));
    },
    onCategoryExpand(category) {
      category.showCategory = !category.showCategory;
    },
  },
  template: indicatorsInfo,

});
