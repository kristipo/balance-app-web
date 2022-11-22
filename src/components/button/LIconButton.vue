<template>
  <div
      class="l-icon-button"
      :class="{...sizeClasses, disabled }"
      @click="$emit('click')"
  >
    <l-icon
        :name="icon"
        class="icon"
    />
  </div>
</template>

<script>
import LIcon from "../LIcon";
import _ from "lodash"

const SMALL_SIZE = 'small'
const MEDIUM_SIZE = 'medium'
const LARGE_SIZE = 'large'

export default {
  name: "LIconButton",

  components: { LIcon },

  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    icon: {
      type: String,
      required: true
    },

    [SMALL_SIZE]: {
      type: Boolean,
      default: false
    },

    [MEDIUM_SIZE]: {
      type: Boolean,
      default: false
    },

    [LARGE_SIZE]: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    sizeClasses() {
      const size = _([SMALL_SIZE, MEDIUM_SIZE, LARGE_SIZE])
          .map(size => [size, this[size]])
          .filter(([, value]) => value)
          .fromPairs()
          .value()
      return _.isEmpty(size) ? {[MEDIUM_SIZE]: true} : size
    }
  }
}
</script>

<style lang="scss" scoped>
  .l-icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;

    &.disabled {
      pointer-events: none;
      opacity: 0.2;
    }

    .icon {
      width: 100%;
      height: 100%;
    }

    &.small {
      height: 16px;
      width: 16px;
    }

    &.medium {
      height: 24px;
      width: 24px;
    }

    &.large {
      height: 30px;
      width: 30px;
    }
  }
</style>
