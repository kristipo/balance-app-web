<template>
  <div class="l-input">
    <div class="input-container" >
      <b-form-input
          ref="input"
          v-bind="{
            autofocus,
            inputmode,
            pattern,
            placeholder,
            required,
            state,
            trim,
            type,
            value
        }"
          @input="$emit('input', $event)"
          @keydown="enter"
          @blur="$emit('blur', $event)"
          size="sm"
      />
      <l-icon-button
          v-if="!withoutReset"
          icon="remove-grey"
          small
          class="reset-button"
          @click="reset"
      />
    </div>
    <div v-if="message" class="message">{{ message }}</div>
    <div v-if="errorMessageVisible" class="message error">{{ errorMessage }}</div>
  </div>
</template>

<script>
import LFormLabel from "@/components/LFormLabel";
import LIconButton from "@/components/button/LIconButton";

const NUMBER_KEYBOARD_PATTERN = '[0-9]'
const NUMERIC_INPUT_MODE = 'numeric'
export default {
  name: "LInput",

  components: {
    LIconButton,
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
    },

    withoutReset: {
      type: Boolean,
      default: false
    }
  },

  emits: [
    'blur',
    'enter',
    'input'
  ],

  computed: {
    errorMessageVisible() {
      return this.state === false && this.errorMessage !== null
    },

    pattern() {
      return this.inputmode === NUMERIC_INPUT_MODE ? NUMBER_KEYBOARD_PATTERN : null
    }
  },

  methods: {
    enter(ev) {
      if (ev.key === 'Enter') {
        this.$emit('enter')
      }
    },

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
  .l-input {
    display: flex;
    flex-direction: column;
    position: relative;
    -webkit-appearance: none;
    margin: 0;

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

    .message {
      font-family: 'Bellota Text', sans-serif;
      font-size: 12px;
      line-height: 19px;
      margin-top: 4px;
      color: $secondary;

      &.error {
        color: $red;
      }
    }
  }
</style>