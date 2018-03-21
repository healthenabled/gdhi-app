<template>
  <div id="app">
    <div class="loading">
      <div class="error" />
    </div>
    <layout />
  </div>
</template>

<script>
import Layout from './components/layout/layout.vue';

export default {
  name: 'App',
  components: {
    Layout,
  },

};
</script>

<style lang="scss">
  @import '../src/assets/stylesheets/main.scss';
</style>
