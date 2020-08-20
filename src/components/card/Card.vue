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

<style lang="scss" scoped>
.soupe-ui-card {
  background-color: transparent !important;
}
</style>
