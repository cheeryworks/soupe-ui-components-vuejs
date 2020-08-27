module.exports = {
  publicPath: '',
  outputDir: 'docs',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/styles/settings.scss";`
      }
    }
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Soupe UI Components (VueJS)'
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
