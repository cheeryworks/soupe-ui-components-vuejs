<template>
  <div class="hero-head soupe-ui-accordion-item-title px-3 py-3" :class="{'is-active': active}">
    <div class="columns" v-if="title">
      <div class="column" v-html="title"></div>
      <div class="column is-narrow">
        <span
          class="tag is-rounded is-danger"
          v-html="alert"
          v-if="alert || alert === 0"
        ></span>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'soupe-ui-accordion-item-title',
  props: {
    title: {
      type: String,
      default() {
        return null
      }
    },
    alert: {
      default() {
        return null
      }
    }
  },
  data() {
    return {
      active: false
    }
  },
  watch: {
    '$parent.currentActive': function(active) {
      this.active = active
    }
  }
}
</script>

<style lang="scss" scoped>
.soupe-ui-accordion-item-title {
  cursor: pointer;
  background-color: $grey-light;
}

.soupe-ui-accordion-item-title.is-active {
  border-bottom: 1px solid $grey;
  font-weight: 600;
}
</style>
