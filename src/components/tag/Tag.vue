<template>
  <span @click="$emit('click')" class="soupe-ui-tag tag">
    <slot></slot>
    <button class="delete is-small" v-if="selected"></button>
  </span>
</template>

<script>
export default {
  name: 'soupe-ui-tag',
  props: {
    selected: {
      type: Boolean,
      default: false
    }
  }
}
</script>
