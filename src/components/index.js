import Select from './select/Select'
import TreeSelect from './tree-select/TreeSelect'
import TreeItem from './tree/TreeItem'
import Tree from './tree/Tree'
import Table from './table/Table'
import Tag from './tag/Tag'
import Accordion from './accordion/Accordion'
import AccordionItem from './accordion/AccordionItem'
import AccordionItemTitle from './accordion/AccordionItemTitle'
import AccordionItemContent from './accordion/AccordionItemContent'
import Card from './card/Card'
import CardHeader from './card/CardHeader'
import CardContent from './card/CardContent'
import ContextMenu from './context-menu/ContextMenu.js'
import MessageBox from './message-box/MessageBox.js'
import Wizard from './wizard/Wizard'
import WizardItem from './wizard/WizardItem'
import DatePicker from './date-picker/DatePicker'

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
  Wizard,
  WizardItem,
  DatePicker
}

const install = function(Vue) {
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
