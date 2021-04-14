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
      internalActive: 0
    }
  },
  created() {
    this.internalActive = this.active
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
