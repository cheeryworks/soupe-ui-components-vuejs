<template>
  <div class="soupe-ui-tree-item">
    <div
      :class="{ active: selected }"
      :style="{ paddingLeft: 15 * level + 'px' }"
      @mouseleave="hovered = false"
      @mouseover="hovered = true"
      class="soupe-ui-tree-item-current"
    >
      <div class="columns is-gapless is-vcentered">
        <div @click="expand" class="column is-narrow soupe-ui-tree-item-arrow">
          <span class="icon">
            <i class="fas" :class="arrowClass"></i>
          </span>
        </div>
        <div @click="select(record)" class="column soupe-ui-tree-item-name">
          <div :class="{ 'text-muted': !itemClickable(record) }">
            {{ name }}
          </div>
        </div>
        <div
          class="column is-narrow soupe-ui-tree-item-controls"
          v-if="
            !showControlsOnMouseOver || (showControlsOnMouseOver && hovered)
          "
        >
          <slot :record="record" name="soupe-ui-tree-item-controls"></slot>
        </div>
      </div>
    </div>
    <div
      class="soupe-ui-tree-item-children"
      v-if="record.children"
      v-show="expanded"
    >
      <soupe-ui-tree-item
        :displayProperty="displayProperty"
        :expandedLevel="expandedLevel"
        :itemClickable="itemClickable"
        :key="idx"
        :level="level + 1"
        :record="childRecord"
        :selectedItemValue="selectedItemValue"
        :selectedItemValues="selectedItemValues"
        :valueProperty="valueProperty"
        @item-selected="select"
        v-for="(childRecord, idx) in record.children"
      >
        <template slot="soupe-ui-tree-item-controls" slot-scope="item">
          <slot :record="item.record" name="soupe-ui-tree-item-controls"></slot>
        </template>
      </soupe-ui-tree-item>
    </div>
  </div>
</template>

<script>
import $record from '../../utils/RecordUtil'

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
          return 'fa-caret-down'
        } else {
          return 'fa-caret-right'
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
        this.$emit('item-selected', record)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.soupe-ui-tree-item {
  cursor: pointer;
}

.soupe-ui-tree-item-name > div {
  padding: 0.5em 0em;
}

.soupe-ui-tree-item-current {
  border-left: 2px solid transparent;
}

.soupe-ui-tree-item-current:hover {
  border-left-color: $grey;
  background-color: $grey;
}

.soupe-ui-tree-item-current.active {
  background-color: $grey-lightest;
  border-left: 2px solid $primary;
  color: $primary;
}

.soupe-ui-tree-item-current.active:hover {
  background-color: $grey;
}

.soupe-ui-tree-item-arrow {
  width: 30px;
  padding-right: 0px !important;
  text-align: center;
}

.soupe-ui-tree-item-arrow .arrow-right {
  margin-top: 2px !important;
}

.soupe-ui-tree-item-controls {
  width: 32px;
}

.arrow-down {
  border-color: $grey-dark transparent transparent transparent;
  width: 20px;
  height: 20px;
}

.arrow-right {
  border-color: transparent transparent transparent $grey;
  width: 20px;
  height: 20px;
}

</style>
