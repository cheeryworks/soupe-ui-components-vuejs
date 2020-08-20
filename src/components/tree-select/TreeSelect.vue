<template>
  <soupe-ui-select
    :border="border"
    :close-on-click="closeOnClick"
    :customized-name="name"
    :left-label="leftLabel"
    :readonly="readonly"
    :right-label="rightLabel"
    :value="currentValue"
    :width="width"
    class="soupe-ui-tree-select"
    ref="select"
  >
    <soupe-ui-tree
      :autoSelect="false"
      :expandedLevel="expandedLevel"
      :itemClickable="optionClickable"
      :records="records"
      :selectedItemValue="currentValue"
      @select="select"
      ref="selectableTree"
    ></soupe-ui-tree>
  </soupe-ui-select>
</template>
<script>
import $record from '@/utils/RecordUtil'

export default {
  name: 'soupe-ui-tree-select',
  props: {
    valueProperty: String,
    displayProperty: String,
    leftLabel: String,
    rightLabel: String,
    options: {
      type: Array
    },
    value: {
      required: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    expandedLevel: Number,
    width: String,
    optionWidth: {
      type: String,
      default: '100%'
    },
    optionHeight: {
      type: String,
      default: '100%'
    },
    border: {
      type: Boolean,
      default: true
    },
    autoSelect: {
      type: Boolean,
      default() {
        return true
      }
    },
    autoOpen: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true
    },
    optionClickable: {
      type: Function,
      default() {
        return true
      }
    }
  },
  data() {
    return {
      name: null,
      currentValue: null
    }
  },
  watch: {
    value() {
      this.initialize()
    },
    options() {
      this.initialize()
    }
  },
  computed: {
    records() {
      let records = []

      if (this.options && this.options.length > 0) {
        for (let option of this.options) {
          records.push(option)
        }
      }

      return records
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      let option = null

      if (this.value) {
        option = this.getOption(this.options)
      }

      if (!option && !this.value && this.autoSelect) {
        if (this.options && this.options.length > 0) {
          this.currentValue = $record.getRecordValue(
            this.options[0],
            this.valueProperty
          )
          this.name = $record.getRecordDisplayName(
            this.options[0],
            this.displayProperty
          )

          option = this.options[0]
        }
      }

      if (option) {
        this.currentValue = $record.getRecordValue(option, this.valueProperty)
        this.name = $record.getRecordDisplayName(option, this.displayProperty)

        if (this.$refs.selectableTree) {
          this.$refs.selectableTree.select(option, true)
        }
      } else {
        this.currentValue = null
        this.name = this.$t('soupe.ui.components.select.options.empty')
      }
    },
    getOption(options) {
      if (this.value) {
        if (options && options.length > 0) {
          for (let option of options) {
            let currentValue = $record.getRecordValue(
              option,
              this.valueProperty
            )

            if (currentValue + '' === this.value + '') {
              return option
            }

            if (option.children && option.children.length > 0) {
              let childOption = this.getOption(option.children)

              if (childOption) {
                return childOption
              }
            }
          }
        }
      }

      return null
    },
    select(option) {
      if (option && !this.readonly) {
        this.currentValue = $record.getRecordValue(option, this.valueProperty)
        this.name = $record.getRecordDisplayName(option, this.displayProperty)

        this.$emit('value-changed', this.currentValue)

        this.$emit('item-selected', option)

        if (this.closeOnClick && this.$refs.select) {
          this.$refs.select.close()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/_all';

.soupe-ui-tree-select .is-dropdown-submenu li:hover {
  background-color: $white;
}

.soupe-ui-tree-select-content {
  overflow: auto;
  min-height: 80px;
}
</style>
