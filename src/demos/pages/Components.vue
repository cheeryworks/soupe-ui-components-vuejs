<template>
  <default-layout>
    <div class="tile hero-body px-0 py-0">
      <div class="tile is-vertical is-3 pl-2 pr-1 py-2 hero soupe-ui-layout-sidebar">
        <div class="panel is-primary hero-body px-0 py-0 hero">
          <p class="panel-heading hero-head">Components</p>
          <div class="hero-body px-0 py-0">
            <p class="panel-block"></p>
            <router-link
              :class="{ 'is-active': $route.name === 'components' }"
              :to="{ name: 'components' }"
              class="panel-block"
            >
              <span class="panel-icon">
                <i aria-hidden="true" class="fas fa-angle-right"></i>
              </span>
              {{ $t('soupe.ui.demos.menus.components.menus.introduction.title') }}
            </router-link>
            <router-link
              :class="{ 'is-active': $route.name === demo.name }"
              :key="demo.name"
              :to="{ name: demo.name }"
              class="panel-block"
              v-for="demo of demos"
            >
              <span class="panel-icon">
                <i aria-hidden="true" class="fas fa-angle-right"></i>
              </span>
              {{ $t('soupe.ui.demos.menus.components.menus.' + demo.name + '.title') }}
            </router-link>
            <p class="panel-block"></p>
          </div>
        </div>
      </div>
      <div class="tile is-9 pl-1 pr-2 py-2 soupe-ui-layout-main-content hero">
        <div class="panel hero-body px-2 py-2 hero">
          <introduction v-if="$route.name === 'components'"></introduction>
          <router-view v-else></router-view>
        </div>
      </div>
    </div>
  </default-layout>
</template>
<script>
import DefaultLayout from '@/demos/layouts/DefaultLayout'
import Introduction from '@/demos/pages/components/Introduction'

export default {
  components: {DefaultLayout, Introduction},
  data() {
    return {
      demos: []
    }
  },
  mounted() {
    let demosRouteConfig = this.getCurrentRouteConfig(
      this.$router.options.routes
    )

    for (let demoRouteConfig of demosRouteConfig.children) {
      let demo = {}

      demo.name = demoRouteConfig.name

      this.demos.push(demo)
    }
  },
  methods: {
    getCurrentRouteConfig(routeConfigs) {
      for (let routeConfig of routeConfigs) {
        if (routeConfig.name === 'components') {
          return routeConfig
        }

        if (routeConfig.children) {
          return this.getCurrentRouteConfig(routeConfig.children)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.soupe-ui-layout-sidebar.hero > .hero-body {
  overflow-x: hidden;
  overflow-y: auto;
  flex-shrink: 1;
}

.soupe-ui-layout-sidebar .panel {
  background-color: transparent;
}

.panel > .hero-body,
.panel.hero-body {
  overflow-x: hidden;
  overflow-y: auto;
  flex-shrink: 1;
}

.tile {
  min-height: auto;
}

.panel-block {
  color: $dark !important;
}
</style>
