<template>
  <soupe-ui-tree-select :options="records" width="100%"></soupe-ui-tree-select>
</template>

<script>
  export default {
    name: 'soupe-ui-tree-select-demo',
    data() {
      return {
        records: [
          {
            id: 'A',
            name: 'A',
            children: [
              {
                id: 'A1',
                name: 'A1'
              },
              {
                id: 'A2',
                name: 'A2'
              }
            ]
          }
        ]
      }
    }
  }
</script>
