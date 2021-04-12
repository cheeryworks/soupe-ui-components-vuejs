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
        additionalData: `@import "~@cheeryworks/soupe-ui-components-skeleton/src/sass/settings";`
      }
    }
  },
  chainWebpack: (config) => {
    config.plugin('html-index').tap((args) => {
      args[0].title = 'Soupe UI Components (Vue.js)'
      return args
    })
  }
}
