<template>
  <div class="footer">
    <div class="footer-width">
      <span class="ft-element"><router-link :to="{path: '/methodology'}">Methodology</router-link></span>
      <span class="ft-element"><router-link :to="{path: '/indicatorsInfo'}">List of Indicators</router-link></span>
      <span class="ft-element"><a href="javascript:void(0);">Contact</a></span>
      <span class="float-right"><i>Data For November 2017</i></span>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>
