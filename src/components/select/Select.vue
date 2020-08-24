<template>
  <div
    :style="{ width: width }"
    class="soupe-ui-select columns is-gapless is-vcentered mx-0 my-0"
    v-click-outside="close"
  >
    <div class="soupe-ui-select-label column is-narrow" v-if="leftLabel">
      <label>{{ leftLabel }}</label>
    </div>
    <div class="soupe-ui-select-options dropdown column">
      <div class="dropdown-trigger">
        <button
          :aria-controls="id"
          :style="{ width: optionWidth }"
          @click="open"
          aria-haspopup="true"
          class="button columns is-gapless"
        >
          <div class="column has-text-left">{{ name }}</div>
          <div class="column is-narrow icon is-small" v-if="!readonly">
            <i aria-hidden="true" class="fas fa-angle-down"></i>
          </div>
        </button>
      </div>
      <div
        :id="id"
        :style="{
          width: optionWidth,
          maxHeight: optionHeight ? optionHeight : 'auto'
        }"
        class="dropdown-menu"
        role="menu"
      >
        <div class="dropdown-content">
          <div v-if="options">
            <div
              :key="i"
              class="soupe-ui-select-option"
              v-for="(option, i) in options"
            >
              <button
                :class="{ 'text-muted': !optionClickable(option) }"
                :style="{ width: optionWidth }"
                @click="select(option, true)"
                class="dropdown-item button is-white"
                v-html="renderName(option)"
              ></button>
            </div>
          </div>
          <slot v-else></slot>
        </div>
      </div>
    </div>
    <div class="soupe-ui-select-label column is-narrow" v-if="rightLabel">
      <label>{{ rightLabel }}</label>
    </div>
  </div>
</template>

<script>
import $record from '../../utils/RecordUtil'

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
      currentValue: null,
      computedOptionWidth: null
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
  mounted() {
    if (this.customizedName) {
      this.name = this.customizedName
    }

    if (this.value) {
      this.currentValue = this.value
    }

    this.setValue()
  },
  directives: {
    clickOutside: {
      bind: function(el, binding) {
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        document.addEventListener('click', handler)
      },

      unbind: function(el) {
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      }
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
        this.name = this.$t('soupe.ui.components.select.options.empty')
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
          this.$emit('value-changed', this.currentValue)

          this.$emit('item-selected', option, isClick)

          if (this.closeOnClick) {
            this.close()
          }
        }
      }
    },
    open() {
      if (this.readonly) {
        return
      }

      this.$el.querySelector('.dropdown').classList.add('is-active')
    },
    close() {
      this.$el.querySelector('.dropdown').classList.remove('is-active')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/_all';

.soupe-ui-select {
  display: inline-flex;
}

.soupe-ui-select-options > .dropdown-menu {
  min-width: auto;
}

.soupe-ui-select-options > .dropdown-menu > .dropdown-content {
  padding: 0px;
}

.soupe-ui-select .button {
  vertical-align: baseline;
}

.soupe-ui-select-label > label {
  padding: 5px;
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
