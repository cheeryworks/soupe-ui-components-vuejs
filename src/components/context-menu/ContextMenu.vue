<template>
  <div class="soupe-ui-context-menu menu">
    <ul class="menu-list">
      <li
        :key="i"
        @click="menu.action()"
        class="is-submenu-item is-dropdown-submenu-item"
        v-for="(menu, i) in menus"
      >
        <a>{{ menu.title }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menus: [],
      clickTimes: 0
    }
  },
  created() {
    document
      .querySelector('body')
      .addEventListener('click', this.destroyElement)
  },
  methods: {
    destroyElement() {
      if (this.clickTimes) {
        document
          .querySelector('body')
          .removeEventListener('click', this.destroyElement)
        this.$destroy(true)
        this.$el.parentNode.removeChild(this.$el)
      } else {
        this.clickTimes = this.clickTimes + 1
      }
    },
    initMenus: function(menus) {
      if (Array.isArray(menus)) {
        this.menus = menus
      }
    }
  }
}
</script>
