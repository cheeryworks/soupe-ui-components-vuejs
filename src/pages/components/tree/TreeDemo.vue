<template>
  <soupe-ui-tree :records="records"></soupe-ui-tree>
</template>

<script>
export default {
  name: 'soupe-ui-tree-demo',
  data() {
    return {
      records: [
        {
          name: 'A',
          value: 'A',
          children: [
            {
              name: 'A1',
              value: 'A1'
            },
            {
              name: 'A2',
              value: 'A2'
            }
          ]
        }
      ]
    }
  }
}
</script>
