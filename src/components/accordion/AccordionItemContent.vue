<template>
  <div
    :style="{ height: height }"
    class="hero-body soupe-ui-accordion-item-content"
    v-show="active"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'soupe-ui-accordion-item-content',
  data() {
    return {
      active: false,
      height: '0px'
    }
  },
  watch: {
    '$parent.currentActive': function(active) {
      this.setActive(active)
    }
  },
  mounted() {
    this.setActive(this.$parent.currentActive)

    window.addEventListener('resize', this.setHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setHeight)
  },
  methods: {
    setActive(active) {
      this.active = active

      this.setHeight()
    },
    setHeight() {
      // let heightOfInactiveItems = 0
      //
      // for (let child of this.$parent.$parent.$children) {
      //   heightOfInactiveItems += child.$children[0].$el.clientHeight
      // }
      //
      // if (this.active) {
      //   let height =
      //     this.$parent.$parent.$el.clientHeight -
      //     heightOfInactiveItems -
      //     1
      //   this.height = height + 'px'
      // } else {
      //   this.height = '0px'
      // }
    }
  }
}
</script>
