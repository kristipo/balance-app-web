<template>
  <div
      class="lulu-text"
      :class="{ bold, grey, sm, lg, red }"
  >{{ formattedText }}</div>
</template>

<script>
import _ from 'lodash'
const RANK_DELIMITER = ' '

const formatText = item => {
  const addMinus = item < 0
  const text = _.toString(item).replace(/-/g, '')
  const length = text.length
  if (length < 3) return text
  const first = length % 3
  let init = ''
  let res = ''
  let number = ''
  for (let i = 0; i < length; i ++) {
    number = text[i]
    init += number
    const isNewRank = ((init.length - first) % 3 === 0 || init.length === first) && init.length < length
    res += number + (isNewRank ? RANK_DELIMITER : '')
  }
  return addMinus ? '-' + res : res
}
export default {
  name: "LText",

  props: {
    bold: {
      type: Boolean,
      default: false
    },

    numberType: {
      type: Boolean,
      default: false
    },

    grey: {
      type: Boolean,
      default: false
    },

    red: {
      type: Boolean,
      default: false
    },

    sm: {
      type: Boolean,
      default: false
    },

    lg: {
      type: Boolean,
      default: false
    },

    text: {
      type: [String, Number],
      required: true
    }
  },

  computed: {
    formattedText() {
      return this.numberType ? formatText(this.text) : this.text
    }
  }
}
</script>

<style scoped lang="scss">
  .lulu-text {
    font-family: 'Bellota Text', sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: $lulu-black;

    &.bold {
      font-weight: 800;
    }

    &.sm {
      font-size: 14px;
    }

    &.lg {
      font-size: 24px;
    }

    &.red {
      color: $primary
    }

    &.grey {
      color: $secondary;
    }
  }
</style>