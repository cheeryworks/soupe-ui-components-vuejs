<template>
  <div class="soupe-ui-message-background" v-show="visible">
    <div class="soupe-ui-message-wrapper">
      <div :style="{ width: width + 'px' }" class="soupe-ui-message-container">
        <div
          class="soupe-ui-message-title pb-4 mb-4 columns is-gapless"
          v-if="titleEnabled"
        >
          <div class="column is-narrow icon">
            <i :class="messageTitleIconClass" class="fas"></i>
          </div>
          <div
            class="column is-narrow"
            style="padding: 0px 5px !important;"
          ></div>
          <div class="column">{{ title ? title : defaultTitle }}</div>
        </div>
        <div
          :style="{ height: contentHeight ? contentHeight + 'px' : 'auto' }"
          class="soupe-ui-message-content overflow-y-auto"
        >
          <component
            :is="contentTemplate.template"
            ref="content"
            v-bind="contentTemplate.props"
            v-if="contentTemplate"
          ></component>
          <slot>
            <p v-html="message" v-if="!!message"></p>
          </slot>
        </div>
        <div class="soupe-ui-message-buttons has-text-right pt-4">
          <template v-if="buttons && buttons.length > 0">
            <button
              :class="button.classes"
              :key="i"
              @click="callMethod(button.callback)"
              v-for="(button, i) in buttons"
            >
              {{ button.text }}
            </button>
          </template>
          <template v-else>
            <button
              @click="callMethod()"
              class="button soupe-ui-message-button"
            >
              {{ $t('soupe.ui.components.message_box.buttons.confirm') }}
            </button>
            <button
              @click="closeMessageBox"
              class="button is-info soupe-ui-message-button"
              v-if="cancelButtonVisible"
            >
              {{ $t('soupe.ui.components.message_box.buttons.cancel') }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: null,
      titleEnabled: true,
      message: null,
      type: 'info',
      content: null,
      contentTemplate: null,
      width: 400,
      height: 0,
      contentHeight: 0,
      visible: true,
      callback() {
      },
      buttons: []
    }
  },
  computed: {
    defaultTitle() {
      if (this.type === 'confirm') {
        return this.$t('soupe.ui.components.message_box.title.confirm')
      } else if (this.type === 'success') {
        return this.$t('soupe.ui.components.message_box.title.success')
      } else if (this.type === 'warning') {
        return this.$t('soupe.ui.components.message_box.title.warning')
      } else if (this.type === 'error') {
        return this.$t('soupe.ui.components.message_box.title.error')
      } else {
        return this.$t('soupe.ui.components.message_box.title.default')
      }
    },
    messageTitleIconClass() {
      if (this.type === 'confirm') {
        return 'fa-info-circle has-text-info'
      } else if (this.type === 'success') {
        return 'fa-info-circle has-text-success'
      } else if (this.type === 'warning') {
        return 'fa-exclamation-triangle has-text-warning'
      } else if (this.type === 'error') {
        return 'fa-exclamation-triangle has-text-danger'
      } else {
        return 'fa-info-circle has-text-primary'
      }
    },
    cancelButtonVisible() {
      if (this.type === 'confirm') {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    let messageBox = document.querySelector('.soupe-ui-message-background')

    if (messageBox) {
      messageBox.remove()
    }

    let self = this

    self.setContentHeight()

    window.addEventListener('resize', function() {
      self.setContentHeight()
    })
  },
  methods: {
    setTitle(title) {
      this.title = title
    },
    setContentHeight() {
      let windowHeight = window.clientHeight

      if (this.height && this.height > 0) {
        let contentHeight = this.height - 104

        let messageBoxHeight = this.$el.querySelector(
          '.soupe-ui-message-container'
        ).clientHeight

        if (windowHeight < messageBoxHeight + 60) {
          contentHeight = windowHeight - 124
        }

        this.contentHeight = contentHeight
      } else {
        let messageBoxHeight = this.$el.querySelector(
          '.soupe-ui-message-container'
        ).clientHeight

        if (windowHeight < messageBoxHeight + 60) {
          this.contentHeight = windowHeight - 124
        } else {
          this.contentHeight = 0
        }
      }
    },
    closeMessageBox() {
      this.visible = false
      this.$destroy(true)

      this.$el.parentNode.removeChild(this.$el)
    },
    async callMethod(callback) {
      let self = this
      let result = null

      if (callback) {
        result = await callback(self, self.$refs.content)
      } else if (this.callback) {
        result = await this.callback(self, self.$refs.content)
      }

      if (typeof result === 'undefined' || result) {
        this.closeMessageBox()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.soupe-ui-message-background {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.soupe-ui-message-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.soupe-ui-message-container {
  min-width: 300px;
  margin: auto;
  padding: 20px;
  border: none;
  border-radius: 2px;
  background-color: $white;
}

.soupe-ui-message-title {
  padding-bottom: 20px;
  border-bottom: 2px solid $grey;
}

.soupe-ui-message-title {
  font-size: 1.5rem;
}

.soupe-ui-message-title i.info {
  color: $info;
}

.soupe-ui-message-title i.warning {
  color: $warning;
}

.soupe-ui-message-title i.alert {
  color: $danger;
}

.soupe-ui-message-content {
  height: auto;
}

.soupe-ui-message-button {
  margin-left: 10px !important;
  margin-bottom: 0px !important;
}
</style>
