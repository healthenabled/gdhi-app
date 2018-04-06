<template>
  <div class="footer">
    <div class="footer-width">
      <span class="ft-element sub-header">
        <router-link
          :to="{path: '/methodology'}"
          class="text-underline">Methodology
        </router-link>
        <span class="ft-element-pipe"> | </span>
      </span>
      <span class="ft-element sub-header">
        <router-link
          :to="{path: '/indicators_info'}"
          class="text-underline" >Indicators
        </router-link>
        <span class="ft-element-pipe"> | </span>
      </span>
      <span class="ft-element sub-header">
        <a
          href="/api/export_global_data"
          class="text-underline">Export Data For All Countries
        </a>
      </span>
      <span class="ft-element float-right contact">
        <span class="">Contact : gdhi@globaldevincubator.org</span>
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>
