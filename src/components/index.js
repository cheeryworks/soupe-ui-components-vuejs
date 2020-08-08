import Select from '@/components/select/Select'
import TreeSelect from '@/components/select/TreeSelect'
import TreeItem from '@/components/tree/TreeItem'
import Tree from '@/components/tree/Tree'
import Table from '@/components/table/Table'

const components = {
  Select,
  TreeSelect,
  TreeItem,
  Tree,
  Table
}

const install = function(Vue) {
  for (let name in components) {
    let component = components[name]

    if (component.name) {
      name = component.name
    }

    Vue.component(name, component)
  }
}

export default {
  install,
  Select,
  TreeSelect,
  TreeItem,
  Tree,
  Table
}
