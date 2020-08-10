import Vue from 'vue'
import Template from './MessageBox.vue'

const MessageBox = function (config = {}) {
  let Tpl = Vue.extend(Template)

  let i18n = this.$i18n

  let instance = new Tpl({
    i18n
  })

  if (typeof config === 'string') {
    config = {
      message: config
    }
  }

  instance.name = 'messageBox'

  for (let key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      instance.$data[key] = config[key]
    }
  }

  if (instance.content) {
    instance.message = null
    instance.$slots.default = [instance.content]
  } else if (instance.contentTemplate) {
    instance.message = null
  } else {
    delete instance.$slots.default
  }

  document
    .querySelector('#app')
    .insertAdjacentElement('beforeend', instance.$mount().$el)

  return instance
}

const install = function (Vue) {
  Vue.prototype.$dialog = MessageBox

  Vue.prototype.$confirm = function (config) {
    config.type = 'confirm'

    return this.$dialog(config)
  }

  Vue.prototype.$success = function (config) {
    config.type = 'success'

    return this.$dialog(config)
  }

  Vue.prototype.$warning = function (config) {
    config.type = 'warning'

    return this.$dialog(config)
  }

  Vue.prototype.$error = function (config) {
    config.type = 'error'

    return this.$dialog(config)
  }
}

export default {
  install
}
