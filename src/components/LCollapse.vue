<template>
  <div class="l-collapse">
    <div class="collapsable-header">
      <div
          class="header-text"
          @click.stop="collapsed = !collapsed"
      >
        <l-text :text="header" />
      </div>
      <slot name="icons"></slot>
    </div>
    <slot v-if="!collapsed"/>
  </div>
</template>

<script>
import LText from "@/components/LText";
export default {
  name: "LCollapse",

  components: { LText },

  props: {
    initCollapsed: {
      type: Boolean,
      default: false
    },

    header: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      collapsed: this.initCollapsed
    }
  }
}
</script>

<style scoped lang="scss">
  .l-collapse {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .collapsable-header {
      display: flex;
      width: fit-content;
      align-items: center;
      cursor: pointer;

      .header-text {
        font-weight: 800;
      }
    }
  }
</style>