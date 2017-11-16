<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
  import Layout from './components/layout/layout.vue'
export default {
    name: 'app',
    components: {
      Layout
    }

}
</script>

<style lang="scss">
  @import '../src/assets/stylesheets/main.scss';
</style>
