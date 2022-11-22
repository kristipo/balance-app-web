<template>
  <div class="l-input-group">
    <l-input
        :value="value"
        autofocus
        inputmode="numeric"
        without-reset
        @enter="$emit('enter')"
        @input="$emit('input', $event)"
    />
    <div class="controls">
      <l-icon-button
          :disabled="disabled"
          large
          icon="check-green"
          @click="$emit('submit')"
      />
      <div @click="$emit('cancel')">
        <l-text :text="$t('cancel')" class="close-text" />
      </div>
    </div>
  </div>
</template>

<script>
import LIconButton from "@/components/button/LIconButton";
import LInput from "@/components/input/LInput";
import LText from "@/components/LText";
import _ from 'lodash'

const LETTER_PATTERN = /[a-zA-Z]+/

export default {
  name: "LInputGroup",

  components: {
    LIconButton,
    LInput,
    LText
  },

  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },

  emits: [
      'cancel',
      'input',
      'submit'
  ],

  computed: {
    disabled() {
      return this.value.match(LETTER_PATTERN) !== null || _.isEmpty(this.value)
    }
  }
}
</script>

<style scoped lang="scss">
  .l-input-group {
    display: flex;
    gap: 10px;

    .controls {
      display: flex;
      gap: 17px;
      color: $black;
      align-items: center;

      .close-text {
        color: $primary;
        font-size: 20px;
      }
    }
  }
</style>