<template>
  <div class="buttons">
    <button class="button is-primary" @click="showNormalDialog">
      Normal Dialog
    </button>
    <button class="button is-info" @click="showConfirmDialog">
      Confirm Dialog
    </button>
    <button class="button is-success" @click="showSuccessDialog">
      Success Dialog
    </button>
    <button class="button is-warning" @click="showWarningDialog">
      Warning Dialog
    </button>
    <button class="button is-danger" @click="showErrorDialog">
      Error Dialog
    </button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        config: {
          //   title: 'Normal Dialog',
          content: 'This is a normal dialog',
          buttons: [
            {
              classes: 'button soupe-ui-message-button',
              text: '完成'
            }
          ]
        }
      }
    },
    methods: {
      showNormalDialog() {
        this.$dialog(this.config)
      },
      showConfirmDialog() {
        this.$confirm(this.config)
      },
      showSuccessDialog() {
        this.$success(this.config)
      },
      showWarningDialog() {
        this.$warning(this.config)
      },
      showErrorDialog() {
        this.$error(this.config)
      }
    }
  }
</script>
