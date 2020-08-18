<template>
  <div class="soupe-ui-message-background" v-show="visible">
    <div class="soupe-ui-message-wrapper">
      <div class="soupe-ui-message-container" :style="{ width: width + 'px' }">
        <div
          class="soupe-ui-message-title pb-4 mb-4 columns is-gapless"
          v-if="titleEnabled"
        >
          <div class="column is-narrow icon">
            <i class="fas" :class="messageTitleIconClass"></i>
          </div>
          <div
            class="column is-narrow"
            style="padding: 0px 5px !important;"
          ></div>
          <div class="column">{{ title ? title : defaultTitle }}</div>
        </div>
        <div
          class="soupe-ui-message-content overflow-y-auto"
          :style="{ height: contentHeight ? contentHeight + 'px' : 'auto' }"
        >
          <component
            v-if="contentTemplate"
            ref="content"
            :is="contentTemplate.template"
            v-bind="contentTemplate.props"
          ></component>
          <slot>
            <p v-if="!!message" v-html="message"></p>
          </slot>
        </div>
        <div class="soupe-ui-message-buttons has-text-right pt-4">
          <template v-if="buttons && buttons.length > 0">
            <button
              v-for="(button, i) in buttons"
              :key="i"
              :class="button.classes"
              @click="callMethod(button.callback)"
            >
              {{ button.text }}
            </button>
          </template>
          <template v-else>
            <button
              class="button soupe-ui-message-button"
              @click="callMethod()"
            >
              {{ $t('global.confirm') }}
            </button>
            <button
              v-if="cancelButtonVisible"
              class="button is-info soupe-ui-message-button"
              @click="closeMessageBox"
            >
              {{ $t('global.cancel') }}
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
        callback() {},
        buttons: []
      }
    },
    computed: {
      defaultTitle() {
        if (this.type === 'confirm') {
          return this.$t('soupe.ui.components.message.title.confirm')
        } else if (this.type === 'success') {
          return this.$t('soupe.ui.components.message.title.success')
        } else if (this.type === 'warning') {
          return this.$t('soupe.ui.components.message.title.warning')
        } else if (this.type === 'error') {
          return this.$t('soupe.ui.components.message.title.error')
        } else {
          return this.$t('soupe.ui.components.message.title.default')
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

      window.addEventListener('resize', function () {
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

<style scoped lang="scss">
  @import '~bulma/sass/utilities/_all';

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