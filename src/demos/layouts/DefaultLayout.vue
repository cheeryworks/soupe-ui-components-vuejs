<template>
  <div class="hero soupe-ui-layout-container">
    <nav
      aria-label="main navigation"
      class="hero-head navbar soupe-ui-layout-header is-dark"
      role="navigation"
    >
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img alt class="logo" src="@/demos/assets/logo.png"/>
          Soupe UI Components (Vue.js)
        </router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link
            :class="{ 'is-active': $route.matched[0].name === 'home' }"
            class="navbar-item"
            to="/"
          >
            {{ $t('soupe.ui.demos.menus.home.title') }}
          </router-link>
          <router-link
            :class="{ 'is-active': $route.matched[0].name === 'components' }"
            class="navbar-item"
            to="/components"
          >
            {{ $t('soupe.ui.demos.menus.components.title') }}
          </router-link>
          <a class="navbar-item" href="https://github.com/cheeryworks/soupe-ui-components-vuejs">
            GitHub
            <img src="@/demos/assets/external-link-alt-solid.svg" class="external-link-icon"/>
          </a>
        </div>
        <!-- <div class="navbar-end">
          <a
            class="navbar-item is-uppercase"
            @click="setLang"
            v-text="lang == 'en' ? 'zh' : '英文'"
          >
          </a>
        </div> -->
      </div>
    </nav>
    <div class="hero-body px-0 py-0 soupe-ui-layout-body hero">
      <slot></slot>
    </div>
    <div class="hero-foot px-1 py-1 soupe-ui-layout-footer">
      ©{{ year }} {{ $t('soupe.ui.demos.company.name') }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      langs: ['en', 'zh'],
      lang: 'en',
      year: new Date().getFullYear()
    }
  },
  created() {
    if (this.$cookie.get('lang')) {
      this.lang = this.$cookie.get('lang')
      this.$i18n.locale = this.lang
    }
  },
  watch: {
    lang: function(newVal) {
      if (!this.$cookie.get('lang') || newVal != this.$cookie.get('lang')) {
        this.$cookie.set('lang', newVal, {expires: '1Y'})
        this.$i18n.locale = newVal
      }
    }
  },
  methods: {
    setLang() {
      if (this.lang == 'en') {
        this.lang = 'zh'
      } else {
        this.lang = 'en'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar.is-dark .navbar-end > a.navbar-item:hover {
  background-color: inherit;
  font-weight: 600;
}

.navbar-burger {
  height: auto;
}
</style>
