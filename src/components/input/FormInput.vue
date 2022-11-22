<template>
  <div class="l-form-input">
    <l-form-label
        v-if="label !== null"
        :value="label"
    />
    <div
        v-if="textAreaMode"
        class="input-container"
    >
      <b-form-textarea
          ref="input"
          :value="value"
          @input="$emit('input', $event)"
          size="sm"
          rows="3"
      />
      <l-icon-button
          icon="remove-grey"
          small
          class="reset-button"
          @click="reset"
      />
    </div>
    <l-input
        ref="input"
        v-else
        v-bind="{
        autofocus,
        inputmode,
        placeholder,
        required,
        state,
        trim,
        type,
        value
      }"
      @input="$emit('input', $event)"
      @enter="$emit('enter')"
      @blur="$emit('blur', $event)"
    />
  </div>
</template>

<script>
import LFormLabel from "@/components/LFormLabel";
import LIconButton from "@/components/button/LIconButton";
import LInput from "@/components/input/LInput";

export default {
  name: "FormInput",

  components: {
    LIconButton,
    LInput,
    LFormLabel
  },

  props: {
    autofocus: {
      type: Boolean,
      default: false
    },

    errorMessage: {
      type: String,
      default: null
    },

    highlight: {
      type: Boolean,
      default: false
    },

    message: {
      type: String,
      default: null
    },

    label: {
      type: String,
      default: null
    },

    inputmode: {
      type: String,
      default: null
    },

    placeholder: {
      type: String,
      default: null
    },

    required: {
      type: Boolean,
      default: false
    },

    state: {
      type: [Boolean, undefined],
      default: null
    },

    textAreaMode: {
      type: Boolean,
      default: false
    },

    trim: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      default: null
    },

    value: {
      type: [String, Number],
      required: true
    }
  },

  emits: ['enter', 'input'],

  methods: {
    async focus() {
      await this.$nextTick()
      await this.$nextTick()
      this.$refs.input.focus()
    },

    reset() {
      this.$emit('input', '')
      this.focus()
    },
  }
}
</script>

<style scoped lang="scss">
  .l-form-input {
    display: flex;
    flex-direction: column;
    position: relative;

    .input-container {
      display: flex;
      position: relative;

      .reset-button {
        position: absolute;
        top: 7px;
        right: 8px;
        background: $white;
      }
    }
  }
</style>