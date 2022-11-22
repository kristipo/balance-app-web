<template>
  <l-text :text="value" class="label" />
</template>

<script>
import LText from "@/components/LText";
export default {
  name: "LFormLabel",

  components: { LText },

  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  .label {
    margin-bottom: 8px;
  }
</style>