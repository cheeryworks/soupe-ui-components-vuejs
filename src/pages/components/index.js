import Introduction from '@/pages/components/Introduction'
import SelectDemo from '@/pages/components/select/SelectDemo'
import TreeSelectDemo from '@/pages/components/tree-select/TreeSelectDemo'
import TreeDemo from '@/pages/components/tree/TreeDemo'
import TableDemo from '@/pages/components/table/TableDemo'

const components = {
  Introduction,
  SelectDemo,
  TreeSelectDemo,
  TreeDemo,
  TableDemo
}

const install = function (Vue) {
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
  Introduction,
  SelectDemo,
  TreeSelectDemo,
  TreeDemo,
  TableDemo
}
