<template>
  <div class="soupe-ui-accordion hero">
    <div class="hero-body px-0 py-0">
      <slot></slot>
    </div>
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
