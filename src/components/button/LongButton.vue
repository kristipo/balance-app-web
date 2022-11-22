<template>
  <div
      class="long-button"
      :class="[color, { disabled, 'full-size': fullSize }]"
      @click.stop="$emit('click')"
  >
    <l-icon
        v-if="icon !== null"
        :name="icon"
        class="long-button-icon"
    />
    <span>{{ text }}</span>
  </div>
</template>

<script>
import LIcon from "@/components/LIcon";
export default {
  name: "LongButton",

  components: {
    LIcon
  },

  emits: ['click'],

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    fullSize: {
      type: Boolean,
      default: false
    },

    icon: {
      type: String,
      default: null
    },

    text: {
      type: String,
      default: null
    },

    primary: {
      type: Boolean,
      default: true
    },

    secondary: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    color() {
      return this.secondary ? 'secondary' : 'primary'
    },
  }
}
</script>

<style scoped lang="scss">
  .long-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: fit-content;
    border-radius: 4px;
    cursor: pointer;
    padding: 6px 12px;

    &.full-size {
      width: 100%;
    }

    .long-button-icon {
      margin-right: 4px;
    }

    span {
      font-family: 'Bellota Text',sans-serif;
      font-size: 16px;
      line-height: 24px;
      color: $white;
    }

    &.primary {
      background: $primary;
    }

    &.secondary {
      background: $secondary;
    }

    &.disabled {
      pointer-events: none;
      cursor: default;
      opacity: 0.5;
    }
  }
</style>