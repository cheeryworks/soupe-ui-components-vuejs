<template>
  <div class="soupe-ui-accordion">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'soupe-ui-accordion',
  mounted() {
    let active = false

    if (this.$children.length > 0) {
      for (let child of this.$children) {
        if (child.currentActive) {
          active = true
        }
      }

      if (!active) {
        this.$children[0].currentActive = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.soupe-ui-accordion {
  display: flex;
  flex-direction: column;
  border: 1px solid $grey;
}
</style>
