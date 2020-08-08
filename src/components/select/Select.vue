<template>
  <ul
    class="soupe-ui-select menu"
    :class="{'dropdown': !currentReadonly, 'grid-x': width}"
    data-dropdown-menu
    :data-disable-hover="!autoOpen"
    :data-click-open="!autoOpen"
    :data-close-on-click-inside="closeOnClick + ''"
    :style="{width: width}"
  >
    <li :class="{'cell shrink': width}" v-if="leftLabel">
      <a class="soupe-ui-select-left-label">{{ leftLabel }}</a>
    </li>
    <li :class="{'cell auto': width}">
      <a class="soupe-ui-select-name" :class="{'soupe-ui-select-border': border}">{{ name }}</a>
      <ul
        class="menu soupe-ui-select-options"
        v-if="options"
        :style="{width: optionWidth, maxHeight: optionHeight ? optionHeight: 'auto'}"
        v-show="!readonly"
      >
        <li v-for="(option, i) in options" :key="i">
          <a
            :style="{width: optionWidth}"
            :class="{'text-muted' : !optionClickable(option)}"
            @click="select(option, true)"
            v-html="renderName(option)"
          ></a>
        </li>
      </ul>
      <slot v-else></slot>
    </li>
    <li :class="{'cell shrink': width}" v-if="rightLabel">
      <a class="soupe-ui-select-right-label">{{ rightLabel }}</a>
    </li>
  </ul>
</template>

<script>
import $record from "@/utils/RecordUtil";

export default {
  name: "soupe-ui-select",
  props: {
    options: {
      required: false,
    },
    value: {
      required: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    customizedName: String,
    border: {
      type: Boolean,
      default: true,
    },
    width: String,
    optionWidth: {
      type: String,
      default: "100%",
    },
    optionHeight: {
      type: String,
      default: null,
    },
    autoSelect: {
      type: Boolean,
      default() {
        return true;
      },
    },
    autoOpen: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true,
    },
    leftLabel: String,
    rightLabel: String,
    valueProperty: String,
    displayProperty: String,
    optionClickable: {
      type: Function,
      default() {
        return true;
      },
    },
  },
  data() {
    return {
      name: null,
      currentValue: null,
    };
  },
  watch: {
    value() {
      this.setValue();
    },
    customizedName() {
      this.name = this.customizedName;
    },
    options() {
      this.setValue();
    },
  },
  computed: {
    currentReadonly() {
      // if (!this.readonly) {
      //   $(this.$el).foundation()
      // }

      return this.readonly;
    },
  },
  created() {
    this.setValue();
  },
  mounted() {
    // let self = this

    // $(this.$el).on('show.zf.dropdownmenu', function() {
    //   let optionsTop = self.$el.querySelector('.soupe-ui-select-name').getBoundingClientRect().bottom
    //   let optionsHeight = self.$el.querySelector('.soupe-ui-select-options').clientHeight
    //
    //   if (window.innerHeight - optionsTop - optionsHeight - 5 <= 0) {
    //     self.$el.querySelector('.soupe-ui-select-options').style.top = (0 - optionsHeight - 4) + 'px'
    //   } else {
    //     self.$el.querySelector('.soupe-ui-select-options').style.top = '100%'
    //   }
    // })

    if (this.customizedName) {
      this.name = this.customizedName;
    }
  },
  methods: {
    setValue() {
      if (this.options && this.options.length > 0) {
        let currentOption = null;

        if (this.autoSelect) {
          currentOption = this.options[0];
        }

        if (this.value) {
          for (let option of this.options) {
            let currentValue =
              $record.getRecordValue(option, this.valueProperty) + "";

            if (currentValue === this.value + "") {
              currentOption = option;
              break;
            }
          }
        }

        if (currentOption) {
          this.select(currentOption, false);
        }
      }

      if (!this.currentValue) {
        this.name = this.$t("global.components.select.options.empty");
      }
    },
    renderName(option) {
      return $record.getRecordDisplayName(option, this.displayProperty);
    },
    select(option, isClick) {
      if (!this.optionClickable || !this.optionClickable(option)) {
        return;
      }

      if (option) {
        this.currentValue = $record.getRecordValue(option, this.valueProperty);
        this.name = $record.getRecordDisplayName(option, this.displayProperty);

        if (!this.readonly) {
          this.$emit("input", this.currentValue);

          this.$emit("select", option, isClick);

          if (this.closeOnClick) {
            this.close();
          }
        }
      }
    },
    close() {
      // try {
      //   $(this.$el).foundation('_hide')
      // } catch (e) {
      // }
    },
  },
};
</script>

<style scoped lang="scss">
@import "~bulma/sass/utilities/_all";

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

.soupe-ui-select-left-label {
  padding-right: 5px !important;
}

.soupe-ui-select-name {
  color: $black !important;
  padding: 9px 23px 9px 5px !important;
}

.soupe-ui-select-options {
  overflow-x: hidden;
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
