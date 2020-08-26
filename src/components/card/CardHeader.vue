Add
<template>
  <div class="hero-head panel-heading soupe-ui-card-header">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'soupe-ui-card-header'
}
</script>

<style lang="scss" scoped>
.soupe-ui-card-header {
  min-height: 60px;
  max-height: 60px;
  font-size: inherit;
  align-items: center;
  display: flex;
  flex-shrink: 1;
}

.soupe-ui-card-header > .columns {
  flex: 1;
}
</style>
