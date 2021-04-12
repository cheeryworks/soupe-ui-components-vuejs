import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages() {
  const locales = require.context(
    '@cheeryworks/soupe-ui-components-skeleton/src/locales/demos/',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  )

  let merge = require('merge')

  const messages = {}

  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1].split('_')[1]
      messages[locale] = merge.recursive(true, messages[locale], locales(key))
    }
  })

  let componentLocales = require.context(
    '@cheeryworks/soupe-ui-components-skeleton/src/locales/components/',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  )

  componentLocales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1].split('_')[1]
      messages[locale] = merge.recursive(true, messages[locale], componentLocales(key))
    }
  })

  return messages
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
