<template>
  <div class="soupe-ui-card panel hero">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'soupe-ui-card'
  }
</script>

<style scoped lang="scss">
  .soupe-ui-card {
    background-color: transparent !important;
  }
</style>
