<template>
  <div>
    <soupe-ui-tree class="box" :records="records" style="width: 50%;">
      <template slot="soupe-ui-tree-item-controls" slot-scope="item">
        <a @click="showMenu($event, item.record)">
          <i class="icon fas fa-bars"></i>
        </a>
      </template>
    </soupe-ui-tree>
    <soupe-ui-tree class="box" :records="records">
      <template slot="soupe-ui-tree-item-controls" slot-scope="item">
        <a @click="showMenu($event, item.record)">
          <i class="icon fas fa-bars"></i>
        </a>
      </template>
    </soupe-ui-tree>
  </div>
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
              },
              {
                id: 'A3',
                name: 'A3'
              },
              {
                id: 'A4',
                name: 'A4'
              },
              {
                id: 'A5',
                name: 'A5'
              }
            ]
          }
        ]
      }
    },
    methods: {
      showMenu(event, record) {
        let self = this

        self.$contextMenu(event, {
          menus: [
            { text: this.$t('global.add-child'), action: 'createChild' },
            { text: this.$t('global.move-up'), action: 'moveUp' },
            { text: this.$t('global.move-down'), action: 'moveDown' },
            { text: this.$t('global.delete'), action: 'delete' }
          ],
          handle: function (action) {
            console.log(action + ' on [' + record + ']')
          }
        })
      }
    }
  }
</script>
