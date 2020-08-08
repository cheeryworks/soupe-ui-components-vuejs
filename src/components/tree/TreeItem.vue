<template>
  <div class="soupe-ui-tree-item">
    <div
      class="soupe-ui-tree-item-current"
      :class="{ active: selected }"
      :style="{ paddingLeft: 15 * level + 'px' }"
      @mouseover="hovered = true"
      @mouseleave="hovered = false"
    >
      <div class="grid-x">
        <div class="cell shrink soupe-ui-tree-item-arrow" @click="expand">
          <a>
            <span :class="arrowClass">&nbsp;&nbsp;&nbsp;</span>
          </a>
        </div>
        <div class="cell auto soupe-ui-tree-item-name" @click="select(record)">
          <a :class="{ 'text-muted': !itemClickable(record) }">{{ name }}</a>
        </div>
        <div
          v-if="
            !showControlsOnMouseOver || (showControlsOnMouseOver && hovered)
          "
          class="cell shrink soupe-ui-tree-item-controls"
        >
          <slot name="soupe-ui-tree-item-controls" :record="record"></slot>
        </div>
      </div>
    </div>
    <div
      class="soupe-ui-tree-item-children"
      v-if="record.children"
      v-show="expanded"
    >
      <soupe-ui-tree-item
        v-for="(childRecord, idx) in record.children"
        :key="idx"
        :selectedItemValue="selectedItemValue"
        :record="childRecord"
        :level="level + 1"
        :expandedLevel="expandedLevel"
        :selectedItemValues="selectedItemValues"
        :valueProperty="valueProperty"
        :displayProperty="displayProperty"
        :itemClickable="itemClickable"
        @select="select"
      >
        <template slot="soupe-ui-tree-item-controls" slot-scope="item">
          <slot name="soupe-ui-tree-item-controls" :record="item.record"></slot>
        </template>
      </soupe-ui-tree-item>
    </div>
  </div>
</template>

<script>
  import $record from '@/utils/RecordUtil'

  export default {
    name: 'soupe-ui-tree-item',
    props: {
      selectedItemValue: {
        required: false
      },
      record: {
        type: Object,
        default() {
          return {}
        }
      },
      level: Number,
      expandedLevel: Number,
      selectedItemValues: {
        type: Array,
        default() {
          return []
        }
      },
      showControlsOnMouseOver: {
        type: Boolean,
        default: true
      },
      valueProperty: String,
      displayProperty: String,
      itemClickable: {
        type: Function,
        default() {
          return true
        }
      }
    },
    data() {
      return {
        name: null,
        expanded: true,
        hovered: false
      }
    },
    created() {
      this.render(this.record)
    },
    watch: {
      record() {
        this.render(this.record)
      },
      selectedItemValues() {
        let currentValue = $record.getRecordValue(
          this.record,
          this.valueProperty
        )

        if (this.selectedItemValues && this.selectedItemValues.length > 0) {
          for (let selectedItemValue of this.selectedItemValues) {
            if (selectedItemValue === currentValue) {
              this.expanded = true
            }
          }
        }
      }
    },
    computed: {
      selected() {
        let currentValue = $record.getRecordValue(
          this.record,
          this.valueProperty
        )

        return currentValue === this.selectedItemValue
      },
      arrowClass() {
        if (this.record.children) {
          if (this.expanded) {
            return 'arrow-down'
          } else {
            return 'arrow-right'
          }
        } else {
          return ''
        }
      }
    },
    methods: {
      render(record) {
        this.name = $record.getRecordDisplayName(record, this.displayProperty)

        if (this.expandedLevel >= 0 && this.level >= this.expandedLevel) {
          this.expanded = false
        } else {
          this.expanded = true
        }
      },
      expand(record) {
        if (!record.leaf) {
          if (this.expanded) {
            this.expanded = false
          } else {
            this.expanded = true
          }
        }
      },
      select(record) {
        if (this.itemClickable && this.itemClickable(record)) {
          this.$emit('select', record)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~bulma/sass/utilities/_all';

  .soupe-ui-tree-item a {
    padding: 9px;
    display: block;
    color: $primary;
  }

  .soupe-ui-tree-item a:hover {
    color: $primary;
  }

  .soupe-ui-tree-item-current:hover {
    background-color: $grey;
  }

  .soupe-ui-tree-item-current.active {
    font-weight: bold;
    background-color: $grey-light;
    border-left: 2px solid $primary;
  }

  .soupe-ui-tree-item-current.active:hover {
    background-color: $grey;
  }

  .soupe-ui-tree-item-arrow {
    width: 30px;
    padding-right: 0px !important;
  }

  .soupe-ui-tree-item-arrow > a {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }

  .soupe-ui-tree-item-arrow > a > span {
    margin-top: 4px !important;
  }

  .soupe-ui-tree-item-name > a {
    padding-left: 0px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .soupe-ui-tree-item-arrow .arrow-right {
    margin-top: 2px !important;
  }

  .soupe-ui-tree-item-controls {
    width: 32px;
  }
</style>
