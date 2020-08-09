<template>
  <soupe-ui-tree :records="records">
    <template slot="soupe-ui-tree-item-controls">
      <a>
        <i class="icon fas fa-bars"></i>
      </a>
    </template>
  </soupe-ui-tree>
</template>

<script>
  export default {
    name: 'soupe-ui-tree-demo',
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
