<template>
  <div
    v-show="active"
    class="soupe-ui-accordion-item-content px-2 py-2"
    :style="{ height: height }"
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
      '$parent.currentActive': function (active) {
        this.setActive(active)
      }
    },
    mounted() {
      this.setActive(this.$parent.currentActive)
    },
    methods: {
      setActive(active) {
        this.active = active

        if (this.active) {
          let height =
            this.$parent.$parent.$el.clientHeight -
            this.$parent.$el.clientHeight * 4
          this.height = height + 'px'
        } else {
          this.height = '0px'
        }

        console.log(this.height)
      }
    }
  }
</script>

<style scoped lang="scss">
  .soupe-ui-accordion-item-content {
    border-left: 1px solid #ededed;
    border-right: 1px solid #ededed;
  }

  .soupe-ui-accordion-item-content:last-child {
    border-bottom: 1px solid #ededed;
  }
</style>
