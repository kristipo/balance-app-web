<template>
  <div
      class="l-statistic-col"
      :class="{ secondary, 'has-header': header != null }"
  >
    <div @click="collapsed = !collapsed">
      <l-text
          v-if="header != null"
          :text="header"
          class="statistic-header"
      />
    </div>
    <div
        v-if="!collapsed"
        class="statistic-container"
    >
      <div
          v-for="item in items"
          :key="item.key"
          class="statistic-row"
      >
        <slot :name="item.key" :text="item.text" :value="item.value">
          <l-text :text="item.text" />:<l-text
            class="row-value"
            :text="item.value"
            number-type
        />
        </slot>
      </div>
      <l-icon-button
          v-if="collapseButton"
          icon="collapse"
          class="collapse-button"
          small
          @click="collapsed = true"
      />
    </div>
  </div>
</template>

<script>
import LText from "@/components/LText";
import LIconButton from "@/components/button/LIconButton";
export default {
  name: "LStatisticCol",

  components: { LIconButton, LText },

  props: {
    collapseButton: {
      type: Boolean,
      default: false
    },

    header: {
      type: String,
      default: null
    },

    items: {
      type: [Array, Object],
      required: true
    },

    rolledPreview: {
      type: Boolean,
      default: false
    },

    secondary: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      collapsed: this.rolledPreview
    }
  }
}
</script>

<style scoped lang="scss">
  .l-statistic-col {
    display: flex;
    flex-direction: column;

    &.secondary {
      background: $lulu-pink;
      border-radius: 5px;
      padding: 20px;
    }

    &.has-header {
      gap: 20px;
    }

    .statistic-container {
      display: flex;
      flex-direction: column;
      gap: 3px;

      .collapse-button {
        align-self: flex-end;
      }
    }

    .statistic-row {
      display: flex;
      min-height: 35px;

      .row-value {
        margin-left: 5px;
      }
    }

    .statistic-header {
      font-weight: 600;
      cursor: pointer;
      color: $primary;
    }
  }

</style>