<template>
  <div class="soupe-ui-select columns is-gapless" :style="{ width: width }">
    <div class="soupe-ui-select-left-label column is-narrow" v-if="leftLabel">
      <button class="button is-white">{{ leftLabel }}</button>
    </div>
    <div class="dropdown" :class="{ 'is-hoverable': !currentReadonly }">
      <div
        class="soupe-ui-select-options dropdown-trigger"
        :style="{ width: width }"
      >
        <button
          class="button"
          aria-haspopup="true"
          :aria-controls="id"
          :style="{ width: width }"
        >
          <span>Dropdown button</span>
          <span class="icon is-small" v-if="!currentReadonly">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" :id="id" role="menu">
        <div class="dropdown-content">
          <button
            v-for="(option, i) in options"
            :key="i"
            class="dropdown-item button is-white"
            :style="{ width: optionWidth }"
            :class="{ 'text-muted': !optionClickable(option) }"
            @click="select(option, true)"
            v-html="renderName(option)"
          ></button>
        </div>
      </div>
    </div>
    <div class="soupe-ui-select-right-label column is-narrow" v-if="rightLabel">
      <button class="button is-white">{{ rightLabel }}</button>
    </div>
  </div>
</template>

<script>
  import $record from '@/utils/RecordUtil'

  export default {
    name: 'soupe-ui-select',
    props: {
      options: {
        required: false
      },
      value: {
        required: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      customizedName: String,
      border: {
        type: Boolean,
        default: true
      },
      width: String,
      optionWidth: {
        type: String,
        default: '100%'
      },
      optionHeight: {
        type: String,
        default: null
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
      leftLabel: String,
      rightLabel: String,
      valueProperty: String,
      displayProperty: String,
      optionClickable: {
        type: Function,
        default(option) {
          if (option) {
            return true
          }
        }
      }
    },
    data() {
      return {
        id: this._uid,
        name: null,
        currentValue: null
      }
    },
    watch: {
      value() {
        this.setValue()
      },
      customizedName() {
        this.name = this.customizedName
      },
      options() {
        this.setValue()
      }
    },
    computed: {
      currentReadonly() {
        return this.readonly
      }
    },
    created() {
      this.setValue()
    },
    mounted() {
      if (this.customizedName) {
        this.name = this.customizedName
      }
    },
    methods: {
      setValue() {
        if (this.options && this.options.length > 0) {
          let currentOption = null

          if (this.autoSelect) {
            currentOption = this.options[0]
          }

          if (this.value) {
            for (let option of this.options) {
              let currentValue =
                $record.getRecordValue(option, this.valueProperty) + ''

              if (currentValue === this.value + '') {
                currentOption = option
                break
              }
            }
          }

          if (currentOption) {
            this.select(currentOption, false)
          }
        }

        if (!this.currentValue) {
          this.name = this.$t('global.components.select.options.empty')
        }
      },
      renderName(option) {
        return $record.getRecordDisplayName(option, this.displayProperty)
      },
      select(option, isClick) {
        if (!this.optionClickable || !this.optionClickable(option)) {
          return
        }

        if (option) {
          this.currentValue = $record.getRecordValue(option, this.valueProperty)
          this.name = $record.getRecordDisplayName(option, this.displayProperty)

          if (!this.readonly) {
            this.$emit('input', this.currentValue)

            this.$emit('select', option, isClick)

            if (this.closeOnClick) {
              this.close()
            }
          }
        }
      },
      close() {
        // try {
        //   $(this.$el).foundation('_hide')
        // } catch (e) {
        // }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~bulma/sass/utilities/_all';

  .soupe-ui-select a {
    color: $grey-dark;
    white-space: nowrap;
  }

  .soupe-ui-select.dropdown.menu > li > a {
    padding-left: 0px;
    padding-right: 0px;
  }

  .soupe-ui-select .menu {
    margin-top: 1px;
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid $grey;
  }

  .soupe-ui-select.menu .is-active > a {
    background-color: transparent;
  }

  .soupe-ui-select .menu li a {
    padding-left: 10px;
    padding-right: 10px;
  }

  .soupe-ui-select .menu li .menu li a {
    padding: 10px;
  }

  .soupe-ui-select .menu {
    min-width: 30px;
  }

  .soupe-ui-select .is-active a {
    color: $grey-dark;
  }

  .soupe-ui-select-left-label > a {
    display: inline-flex;
    justify-content: center;
  }

  .soupe-ui-select-name {
    color: $black !important;
    padding: 9px 23px 9px 5px !important;
  }

  .soupe-ui-select-options .button {
    justify-content: left;
  }

  .soupe-ui-select-options a:hover {
    color: $black;
  }

  .soupe-ui-select-border {
    border: 1px solid $grey;
    border-radius: $radius;
  }

  .soupe-ui-select-border:hover {
    border: 1px solid $grey-dark;
  }

  .soupe-ui-select-right-label {
    padding-left: 5px !important;
  }
</style>
