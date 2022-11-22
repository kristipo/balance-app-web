<template>
  <img
      :src="icon"
      :width="width"
      :height="height"
  >
</template>

<script>
export default {
  name: "LIcon",

  props: {
    name: {
      type: String,
      required: true
    },

    width: {
      type: Number,
      default: null
    },

    height: {
      type: Number,
      default: null
    }
  },
  computed: {
    icon() {
      return `icons/${this.name}.svg`
    }
  }

}
</script>