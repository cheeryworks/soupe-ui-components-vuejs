<template>
  <div class="hero-head soupe-ui-accordion-item-title px-3 py-3" :class="{'is-active': active}">
    <div class="columns">
      <div class="column">
        <slot></slot>
        <span v-if="title">{{ title }}</span>
      </div>
      <div class="column is-narrow">
        <span
          class="tag is-rounded is-danger"
          v-html="alert"
          v-if="alert || alert === 0"
        ></span>
      </div>
      <div class="column is-narrow">
        <span class="icon">
          <i class="fas" :class="{'fa-angle-right': !active, 'fa-angle-down': active}"></i>
        </span>
      </div>
    </div>
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
