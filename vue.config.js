module.exports = {
  publicPath: '',
  outputDir: 'docs',
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => Object.assign(options, { limit: 10240 }))
    config.plugin('html').tap((args) => {
      args[0].title = 'Soupe UI Components (VueJS)'
      return args
    })
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
