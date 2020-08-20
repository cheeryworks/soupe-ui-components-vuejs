<template>
  <div class="soupe-ui-accordion-item-title has-background-light px-3 py-3">
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
  }
}
</script>

<style lang="scss" scoped>
.soupe-ui-accordion-item-title {
  cursor: pointer;
}

.soupe-ui-accordion-item-title:not(:last-child) {
  border-bottom: 1px solid #ededed;
}

.soupe-ui-accordion-item-title .badge {
  min-width: 14px;
  height: 14px;
  padding: 1px 2px;
  border-radius: 7px;
  font-weight: bold;
}
</style>
