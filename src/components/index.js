import Select from '@/components/select/Select'
import TreeSelect from '@/components/tree-select/TreeSelect'
import TreeItem from '@/components/tree/TreeItem'
import Tree from '@/components/tree/Tree'
import Table from '@/components/table/Table'
import Tag from '@/components/tag/Tag'
import Accordion from '@/components/accordion/Accordion'
import AccordionItem from '@/components/accordion/AccordionItem'
import AccordionItemTitle from '@/components/accordion/AccordionItemTitle'
import AccordionItemContent from '@/components/accordion/AccordionItemContent'
import Card from '@/components/card/Card'
import CardHeader from '@/components/card/CardHeader'
import CardContent from '@/components/card/CardContent'
import ContextMenu from '@/components/context-menu/ContextMenu.js'
import MessageBox from '@/components/message-box/MessageBox.js'

const components = {
  Select,
  TreeSelect,
  TreeItem,
  Tree,
  Table,
  Tag,
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemContent,
  Card,
  CardHeader,
  CardContent,
  ContextMenu,
  MessageBox
}

const install = function (Vue) {
  for (let name in components) {
    let component = components[name]

    if (component.name) {
      name = component.name
    }

    Vue.component(name, component)
  }

  MessageBox.install(Vue)
  ContextMenu.install(Vue)
}

export default {
  install
}
