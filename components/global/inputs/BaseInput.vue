<template>
  <div>
    <input
      class="form-control form-control-lg font-14 fw-300"
      :type="inputType"
      :value="value"
      :readonly="readonly"
      :placeholder="placeholder"
      :class="{ 'is-invalid': form.errors.has(field) }"
      @input="handleInput"
    />
    <div v-if="form.errors.has(field)" v-html="form.errors.get(field)" class="text-danger font-13 mt-1 text-right dir-rtl" />
  </div>
</template>

<script>
    export default {
      name: "BaseInput",
      props: {
        form: {
          type: Object,
          required: true
        },
        field: {
          type: String,
          required: true
        },
        value: {
          type: String,
          default: ''
        },
        placeholder: {
          type: String,
          default: ''
        },
        inputType: {
          type: String,
          default: 'text'
        },
        readonly: {
          type: Boolean,
          default: false
        }
      },

      methods: {
        handleInput(e) {
          this.$emit('input', e.target.value);
        }
      },
    }
</script>

<style scoped>

</style>
