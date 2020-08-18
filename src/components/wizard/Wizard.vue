<template>
  <div class="soupe-ui-wizard columns is-vcentered is-gapless px-2 py-2">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'soupe-ui-wizard',
    props: {
      active: {
        type: Number,
        default() {
          return 0
        }
      }
    },
    data() {
      return {
        items: [],
        internalActive: 0,
        itemWidth: 100
      }
    },
    created() {
      this.internalActive = this.active
    },
    watch: {
      items() {
        let totalWidth = this.$el.clientWidth

        if (this.items.length <= 4) {
          this.itemWidth = totalWidth / 4
        } else {
          this.itemWidth = totalWidth / this.items.length
        }
      }
    },
    methods: {
      setActive(active) {
        this.internalActive = active
      },
      getActive() {
        return this.internalActive
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~bulma/sass/utilities/_all';

  .soupe-ui-wizard {
    background-color: $light;
  }
</style>
