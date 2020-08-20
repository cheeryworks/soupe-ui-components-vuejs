<template>
  <div class="soupe-ui-tree">
    <template v-for="(record, idx) in records">
      <soupe-ui-tree-item
        :displayProperty="displayProperty"
        :expandedLevel="expandedLevel"
        :itemClickable="itemClickable"
        :key="idx"
        :level="0"
        :record="record"
        :selectedItemValue="internalSelectedItemValue"
        :selectedItemValues="selectedItemValues"
        :valueProperty="valueProperty"
        @item-selected="onSelect"
      >
        <template slot="soupe-ui-tree-item-controls" slot-scope="item">
          <slot :record="item.record" name="soupe-ui-tree-item-controls"></slot>
        </template>
      </soupe-ui-tree-item>
    </template>
  </div>
</template>

<script>
import $record from '@/utils/RecordUtil'

export default {
  name: 'soupe-ui-tree',
  props: {
    selectedItemValue: {
      required: false
    },
    records: {
      type: Array
    },
    autoSelect: {
      type: Boolean,
      default: true
    },
    selectOnClick: {
      type: Boolean,
      default: true
    },
    expandedLevel: Number,
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
      initialSelected: false,
      selectedItemValues: [],
      internalSelectedItemValue: null
    }
  },
  watch: {
    records() {
      this.onLoad()
    }
  },
  created() {
    this.internalSelectedItemValue = this.selectedItemValue

    this.onLoad()
  },
  methods: {
    onLoad() {
      this.selectedItemValues = []

      let selectedItem = this.updateSelectedItemValues(this.records)

      if (!this.initialSelected) {
        if (selectedItem) {
          this.onSelect(selectedItem)
          this.initialSelected = true
        } else if (
          !this.selectedItemValue &&
          this.autoSelect &&
          this.records[0]
        ) {
          this.onSelect(this.records[0])
          this.initialSelected = true
        }
      } else if (!selectedItem) {
        if (this.autoSelect && this.records[0]) {
          this.onSelect(this.records[0])
        }
      }
    },
    updateSelectedItemValues(records) {
      let selectedItem = null

      if (records && records.length > 0) {
        for (let record of records) {
          let currentValue = $record.getRecordValue(
            record,
            this.valueProperty
          )

          if (currentValue === this.internalSelectedItemValue) {
            this.selectedItemValues.push(currentValue)
            selectedItem = record
            break
          }

          if (record.children && record.children.length > 0) {
            selectedItem = this.updateSelectedItemValues(record.children)

            if (selectedItem) {
              this.selectedItemValues.push(currentValue)
              break
            }
          }
        }
      }

      return selectedItem
    },
    onSelect(record) {
      if (this.selectOnClick) {
        this.internalSelectedItemValue = $record.getRecordValue(
          record,
          this.valueProperty
        )
      }

      if (!this.initialSelected) {
        this.initialSelected = true
      }

      this.$emit('item-selected', record)
    },
    select(record, noEmit) {
      if (record) {
        this.internalSelectedItemValue = $record.getRecordValue(
          record,
          this.valueProperty
        )
      } else {
        this.internalSelectedItemValue = null
      }

      if (!noEmit) {
        this.$emit('item-selected', record)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/_all';

.soupe-ui-tree {
  background-color: $white;
}
</style>
