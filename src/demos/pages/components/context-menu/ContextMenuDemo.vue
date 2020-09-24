<template>
  <div>
    <soupe-ui-tree :records="records" class="box" style="width: 50%;">
      <template slot="soupe-ui-tree-item-controls" slot-scope="item">
        <a @click="showMenu($event, item.record)">
          <i class="icon fas fa-bars"></i>
        </a>
      </template>
    </soupe-ui-tree>
    <soupe-ui-tree :records="records" class="box">
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
          {
            title: this.$t('soupe.ui.demos.context_menu.add-child'),
            action: function() {
              // eslint-disable-next-line
              console.log('Add child on [' + record + ']')
            }
          },
          {
            title: this.$t('soupe.ui.demos.context_menu.move-up'),
            action: function() {
              // eslint-disable-next-line
              console.log('Move up on [' + record + ']')
            }
          },
          {
            title: this.$t('soupe.ui.demos.context_menu.move-down'),
            action: function() {
              // eslint-disable-next-line
              console.log('Move down on [' + record + ']')
            }
          },
          {
            title: this.$t('soupe.ui.demos.context_menu.delete'),
            action: function() {
              // eslint-disable-next-line
              console.log('Delete on [' + record + ']')
            }
          }
        ]
      })
    }
  }
}
</script>
