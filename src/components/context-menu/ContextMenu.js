import Vue from 'vue'
import Template from './ContextMenu.vue'

const ContextMenu = function (event, config = {}) {
  let Tpl = Vue.extend(Template)

  let instance = new Tpl()

  for (let key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      instance.$data[key] = config[key]
    }
  }

  if (config.menus) {
    instance.initMenus(config.menus)
  }

  let menuContent = instance.$mount().$el

  document.querySelector('#app').insertAdjacentElement('beforeend', menuContent)

  menuContent.style.left = event.clientX + 10 + 'px'

  if (window.innerHeight > event.pageY + menuContent.clientHeight) {
    menuContent.style.top = event.pageY + 'px'
  } else {
    menuContent.style.top = event.pageY - menuContent.clientHeight + 35 + 'px'
  }

  if (window.innerWidth <= event.clientX + menuContent.clientWidth) {
    menuContent.style.left = event.clientX - menuContent.clientWidth - 35 + 'px'
  } else {
    menuContent.style.left = event.clientX + 10 + 'px'
  }

  return instance
}

const install = function (Vue) {
  Vue.prototype.$contextMenu = ContextMenu
}

export default {
  install
}
