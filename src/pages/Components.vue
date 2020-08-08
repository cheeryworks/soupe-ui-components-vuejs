<template>
  <default-layout>
    <div class="tile hero-body px-0 py-0 soupe-ui-layout-sidebar">
      <div class="tile is-vertical is-3 px-2 py-2 hero">
        <div class="panel is-primary hero-body px-0 py-0 hero">
          <p class="panel-heading hero-head">Components</p>
          <div class="hero-body px-0 py-0">
            <p class="panel-block"></p>
            <router-link
              :to="{ name: 'components' }"
              class="panel-block"
              :class="{ 'is-active': $route.name === 'components' }"
            >
              <span class="panel-icon">
                <i class="fas fa-angle-right" aria-hidden="true"></i>
              </span>
              Introduction
            </router-link>
            <router-link
              v-for="demo of demos"
              :to="{ name: demo.key }"
              :key="demo.key"
              class="panel-block"
              :class="{ 'is-active': $route.name === demo.key }"
            >
              <span class="panel-icon">
                <i class="fas fa-angle-right" aria-hidden="true"></i>
              </span>
              {{ demo.name }}
            </router-link>
            <p class="panel-block"></p>
          </div>
        </div>
      </div>
      <div class="tile is-9 px-2 py-2 soupe-ui-layout-main-content hero">
        <div class="panel hero-body px-2 py-2">
          <introduction v-if="$route.name === 'components'"></introduction>
          <router-view v-else></router-view>
        </div>
      </div>
    </div>
  </default-layout>
</template>
<script>
  import DefaultLayout from '@/layouts/DefaultLayout'
  import Introduction from '@/pages/components/Introduction'

  export default {
    components: { DefaultLayout, Introduction },
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

        demo.key = demoRouteConfig.name
        demo.name = demoRouteConfig.meta.displayName

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
