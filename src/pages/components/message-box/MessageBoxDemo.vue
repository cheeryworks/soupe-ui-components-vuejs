<template>
  <div class="buttons">
    <button @click="showNormalDialog" class="button is-primary">
      Normal Dialog
    </button>
    <button @click="showConfirmDialog" class="button is-info">
      Confirm Dialog
    </button>
    <button @click="showSuccessDialog" class="button is-success">
      Success Dialog
    </button>
    <button @click="showWarningDialog" class="button is-warning">
      Warning Dialog
    </button>
    <button @click="showErrorDialog" class="button is-danger">
      Error Dialog
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        content: 'This is a normal dialog'
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
