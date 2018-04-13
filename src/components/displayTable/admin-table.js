import Vue from "vue";
import adminTable from './admin-table.html';

export default Vue.extend({
  props:{
    columns:{
      type: Array,
      default() {
        return [];
      },
    },
    rows: {
      type: Array,
      default() {
        return [];
      },
    },
    action: {
      type: String,
      default() {
        return '';
      },
    },
    actionHandler: {
      type: Function,
      default() {
        return () => {};
      },
    },
  },
  data() {
    return {
    };
  },
  methods: {
  },

  template: adminTable
});
