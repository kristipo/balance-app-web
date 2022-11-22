<template>
  <div class="l-double-input">
    <form-input
        v-bind="{
          value,
          state,
          errorMessage
        }"
        :value="value"
        autofocus
        number-type
        type="number"
        inputmode="numeric"
        class="first-input"
        @input="$emit('input', $event)"
        @enter="$emit('enter')"
        @blur="$emit('blur')"
    />
    <div class="second-input-container">
      <l-text :text="$t('cash.decimalPrice')" />
      <form-input
          :value="secondValue"
          inputmode="numeric"
          class="second-input"
          @input="$emit('update:second-value', $event)"
          @enter="$emit('enter')"
          @blur="$emit('blur')"
      />
      <slot />
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/input/FormInput";
import LText from "@/components/LText";

export default {
  name: "LDoubleInput",

  components: {
    LText,
    FormInput
  },

  emits: ['blur', 'enter', 'input'],

  props: {
    errorMessage: {
      type: String,
      default: null
    },
    secondValue: {
      type: String,
      required: true
    },

    state: {
      type: Boolean,
      default: null
    },

    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  .l-double-input {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;

    .first-input {
      flex: 1;
    }

    .second-input-container {
      display: flex;
      align-items: center;
      gap: 5px;

      .second-input {
        width: 50px;
      }
    }
  }
</style>