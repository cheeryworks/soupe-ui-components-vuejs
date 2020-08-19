<template>
  <div class="hero soupe-ui-layout-container">
    <nav
      class="hero-head navbar soupe-ui-layout-header is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <img src="@/assets/logo.png" class="logo" alt />
          Soupe UI Components (VueJS)
        </router-link>
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-menu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" id="navbar-menu">
        <div class="navbar-start">
          <router-link
            to="/"
            class="navbar-item"
            :class="{ 'is-active': $route.matched[0].name === 'home' }"
            >{{ $t('soupe.ui.demos.menus.home.title') }}</router-link
          >
          <router-link
            to="/components"
            class="navbar-item"
            :class="{ 'is-active': $route.matched[0].name === 'components' }"
            >{{ $t('soupe.ui.demos.menus.components.title') }}</router-link
          >
        </div>
        <div class="navbar-end">
          <a
            class="navbar-item is-uppercase"
            @click="setLang"
            v-text="lang == 'en' ? 'zh' : '英文'"
          >
          </a>
        </div>
      </div>
    </nav>
    <div class="hero-body px-0 py-0 soupe-ui-layout-body hero">
      <slot></slot>
    </div>
    <div class="hero-foot px-1 py-1 soupe-ui-layout-footer">
      ©2020 CheeryWorks, Ltd.
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        langs: ['en', 'zh'],
        lang: 'en'
      }
    },
    created() {
      if (this.$cookie.get('lang')) {
        this.lang = this.$cookie.get('lang')
        this.$i18n.locale = this.lang
      }

      document.addEventListener('DOMContentLoaded', () => {
        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(
          document.querySelectorAll('.navbar-burger'),
          0
        )

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {
          // Add a click event on each of them
          $navbarBurgers.forEach((el) => {
            el.addEventListener('click', () => {
              // Get the target from the "data-target" attribute
              const target = el.dataset.target
              const $target = document.getElementById(target)

              // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
              el.classList.toggle('is-active')
              $target.classList.toggle('is-active')
            })
          })
        }
      })
    },
    watch: {
      lang: function(newVal) {
        if (!this.$cookie.get('lang') || newVal != this.$cookie.get('lang')) {
          this.$cookie.set('lang', newVal, { expires: '1Y' })
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
