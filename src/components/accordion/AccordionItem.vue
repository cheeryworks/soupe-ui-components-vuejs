<template>
  <div @click="setActive" class="soupe-ui-accordion-item hero" :class="{'is-active': currentActive}">
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

<style lang="scss" scoped>
.soupe-ui-accordion-item.is-active {
  flex: 1;
}

.soupe-ui-accordion-item:not(:last-child) {
  border-bottom: 1px solid $grey;
}
</style>
