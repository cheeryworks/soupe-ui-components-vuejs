module.exports = {
  publicPath: '',
  outputDir: 'docs',
  pages: {
    index: {
      entry: 'src/demos/main.js'
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/demos/styles/settings.scss";`
      }
    }
  },
  chainWebpack: (config) => {
    config.plugin('html-index').tap((args) => {
      args[0].title = 'Soupe UI Components (Vue.js)'
      return args
    })
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales'
    }
  }
}
