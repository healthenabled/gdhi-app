<template>
  <div
    id="app"
    :dir="direction"
  >
    {{ $t('') }} <!-- Added intentionally as component does not re render on locale change if i18n library is not used in template -->
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
    <layout/>
  </div>
</template>

<script>
  import Layout from './components/layout/layout.vue';
  import {LayoutDirectionConfig} from './plugins/i18n';

  export default {
    name: 'App',
    components: {
      Layout,
    },
    data() {
      return {
        direction: 'ltr'
      };
    },
    updated() {
      this.direction = LayoutDirectionConfig[this.$i18n.locale];
    }

  };
</script>

<style lang="scss">
  @import '../src/assets/stylesheets/main.scss';
</style>
