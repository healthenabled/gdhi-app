<template>
  <div id="app">
    <notifications
      group="custom-template"
      position="bottom right"
      :width="400">
      <template
        slot="body"
        scope="props">
        <div :class="'custom-template vue-notification ' + props.item.type ">
          <div class="row">
            <div class="custom-template-icon">
              <i
                class="fa fa-check-circle fa-3x"
                v-if="props.item.type === 'success'"/>
              <i
                class="fa fa-times-circle fa-3x"
                v-if="props.item.type === 'error'"/>
              <i
                class="fa fa-exclamation-circle fa-3x"
                v-if="props.item.type === 'warn'"/>
            </div>
            <div class="custom-template-content">
              <div class="custom-template-title header-bold">
                {{ props.item.title }}
              </div>
              <div
                class="custom-template-text sub-header"
                v-html="props.item.text" />
            </div>
          </div>
        </div>
      </template>
    </notifications>

    <div 
      class="loading" 
      id="loader">
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
