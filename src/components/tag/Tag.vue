<template>
  <span class="soupe-ui-tag tag" @click="$emit('soupe-ui-tag-click')">
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
