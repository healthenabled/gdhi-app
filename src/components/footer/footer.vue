<template>
  <div class="footer">
    <div class="footer-width">
      <span class="ft-element"><router-link :to="{path: '/methodology'}">Methodology</router-link> <span class="ft-element-pipe"> | </span></span>
      <span class="ft-element"><router-link :to="{path: '/indicators_info'}">List of Indicators</router-link></span>
      <span class="float-right"><i>Data For November 2017</i></span>
      <span class="ft-element float-right"><i>Contact : gdhi@globaldevincubator.org</i> <span class="ft-element-pipe"> | </span></span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>
