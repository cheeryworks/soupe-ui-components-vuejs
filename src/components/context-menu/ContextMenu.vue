<template>
  <div v-show="showMenu" class="soupe-ui-context-menu menu">
    <ul class="menu-list">
      <li
        v-for="(menu, i) in showMenuArray"
        :key="i"
        class="is-submenu-item is-dropdown-submenu-item"
        @click="handle(menu.action)"
      >
        <a>{{ menu.text }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showMenuArray: [{ text: '11', action: 'createChild' }],
        clickTimes: 0,
        showMenu: true,
        handle: function (action) {
          alert(
            'you may need to give a method [handleMenu] to this menu [' +
              action +
              ']'
          )
        }
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
      initMenus: function (menus) {
        if (Array.isArray(menus)) {
          this.showMenuArray = menus
        } else if (typeof menus === 'string') {
          if (menus === 'baseTreeMenu') {
            this.showMenuArray = [
              { text: this.$t('global.add-child'), action: 'createChild' },
              { text: this.$t('global.move-up'), action: 'moveUp' },
              { text: this.$t('global.move-down'), action: 'moveDown' },
              { text: this.$t('global.delete'), action: 'delete' }
            ]
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~bulma/sass/utilities/_all';

  .soupe-ui-context-menu {
    position: absolute;
    z-index: 100;
  }

  .soupe-ui-context-menu .menu-list {
    background-color: $white;
    border-radius: 2px;
    border: solid 1px $grey;
  }

  .soupe-ui-context-menu .menu-list > li > a {
    padding: 5px 1.2rem;
    color: $black;
    font-size: 14px;
  }

  .soupe-ui-context-menu .menu-list > li:hover {
    background-color: $grey-light;
  }

  .soupe-ui-context-menu .menu-list > li > a:hover {
    font-weight: bold;
  }
</style>
