<template>
  <div class="footer">
    <div class="footer-width">
      <span class="ft-element"><router-link :to="{path: '/methodology'}">Methodology</router-link> <span class="ft-element-pipe"> | </span></span>
      <span class="ft-element"><router-link :to="{path: '/indicators_info'}">List of Indicators</router-link></span>
      <span class="ft-element float-right contact">
        <span class="">Contact : gdhi@globaldevincubator.org <span class="ft-element-pipe"> | </span></span>
        <span>Data For November 2017</span>
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>
