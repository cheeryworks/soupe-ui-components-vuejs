import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Components from '@/pages/Components'
import ComponentDemos from '@/pages/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/components',
      name: 'components',
      component: Components,
      children: [
        {
          path: '/components/select',
          name: 'select',
          component: ComponentDemos.SelectDemo
        },
        {
          path: '/components/tree',
          name: 'tree',
          component: ComponentDemos.TreeDemo
        },
        {
          path: '/components/tree-select',
          name: 'tree-select',
          component: ComponentDemos.TreeSelectDemo
        },
        {
          path: '/components/table',
          name: 'table',
          component: ComponentDemos.TableDemo
        },
        {
          path: '/components/tag',
          name: 'tag',
          component: ComponentDemos.TagDemo
        },
        {
          path: '/components/context-menu',
          name: 'context-menu',
          component: ComponentDemos.ContextMenuDemo
        },
        {
          path: '/components/message-box',
          name: 'message-box',
          component: ComponentDemos.MessageBoxDemo
        },
        {
          path: '/components/card',
          name: 'card',
          component: ComponentDemos.CardDemo
        },
        {
          path: '/components/accordion',
          name: 'accordion',
          component: ComponentDemos.AccordionDemo
        },
        {
          path: '/components/wizard',
          name: 'wizard',
          component: ComponentDemos.WizardDemo
        },
        {
          path: '/components/date-picker',
          name: 'date-picker',
          component: ComponentDemos.DatePickerDemo
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
