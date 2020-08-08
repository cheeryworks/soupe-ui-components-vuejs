<template>
  <div class="hero soupe-ui-layout-container">
    <nav class="hero-head navbar soupe-ui-layout-header is-dark">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="@/assets/logo.png" class="logo" alt />
          Soupe UI Components (VueJS)
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link
            to="/"
            class="navbar-item"
            :class="{'is-active': $route.matched[0].name === 'home'}"
          >Home</router-link>
          <router-link
            to="/components"
            class="navbar-item"
            :class="{'is-active': $route.matched[0].name === 'components'}"
          >Components</router-link>
        </div>
      </div>
    </nav>
    <div class="hero-body px-0 py-0 soupe-ui-layout-body hero">
      <slot></slot>
    </div>
    <div class="hero-foot px-1 py-1 soupe-ui-layout-footer">©2020 CheeryWorks, Ltd.</div>
  </div>
</template>
