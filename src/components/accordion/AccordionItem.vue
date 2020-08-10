<template>
  <div class="soupe-ui-accordion-item" @click="setActive">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'soupe-ui-accordion-item',
    props: {
      active: {
        type: Boolean,
        required: false,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        currentActive: false
      }
    },
    mounted() {
      this.currentActive = this.active
    },
    methods: {
      setActive() {
        if (
          this.$parent &&
          this.$parent.$children &&
          this.$parent.$children.length > 0
        ) {
          for (let child of this.$parent.$children) {
            if (child.currentActive) {
              child.currentActive = false
            }
          }

          this.currentActive = true
        }
      }
    }
  }
</script>
