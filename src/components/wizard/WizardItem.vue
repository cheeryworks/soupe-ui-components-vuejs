<template>
  <div
    @click="onItemClick"
    class="soupe-ui-wizard-item column columns is-vcentered is-gapless my-0"
  >
    <a :class="{ active: active }" class="column">{{ title }}</a>
    <a class="column is-narrow" v-if="!isLast">
      <i class="fas fa-angle-right"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: 'soupe-ui-wizard-item',
  props: {
    title: {
      type: String
    }
  },
  beforeCreate() {
    this.$parent.items.push(this)
  },
  computed: {
    isLast() {
      let parent = this.$parent
      return parent.items[parent.items.length - 1] === this
    },
    active() {
      if (this.$parent.items.length - 1 >= this.$parent.internalActive) {
        if (this.$parent.items[this.$parent.internalActive] === this) {
          return true
        }
      }

      return false
    }
  },
  methods: {
    onItemClick() {
      if (this.$parent.items) {
        for (let i = 0; i < this.$parent.items.length; i++) {
          if (this.$parent.items[i] === this) {
            this.$parent.internalActive = i
          }
        }
      }

      this.$emit('item-click')
    }
  }
}
</script>
