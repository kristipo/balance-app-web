<template>
  <div class="l-wage-table">
    <div class="table-row">
      <l-text
          v-for="{ text, key } in header"
          :text="text"
          :key="key"
          class="cell header"
      />
    </div>
    <div
        v-for="item in items"
        class="table-row"
    >
      <div
          v-for="{ key, isNumber } in header"
          class="cell"
          @click="$emit('click', item)"
      >
        <slot
            :name="key"
            v-bind="{ item, key }"
        >
          <l-text
              :text="item[key]"
              :number-type="numbersValue || isNumber"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import LText from "@/components/LText";
export default {
  name: "LTable",

  components: {
    LText
  },

  emits: ['click'],

  props: {
    header: {
      type: Array,
      required: true
    },

    items: {
      type: Array,
      default: () => []
    },

    numbersValue: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      columns: this.header.length
    }
  }
}
</script>

<style scoped lang="scss">
  .l-wage-table {
    width: 100%;
    border-bottom: 1px solid black;

    .table-row {
      display: grid;
      justify-content: center;
      grid-template-columns: repeat((v-bind(columns), 1fr));
      border-right: 1px solid black;
    }

    .cell {
      display: flex;
      justify-content: center;
      border-left: 1px solid black;
      border-top: 1px solid black;
      padding: 10px;
      cursor: pointer;
      text-align: center;

      &.header {
        border-top: 1px solid black;
        padding: 10px;
        background: $lulu-pink;
        cursor: default;
        pointer-events: none;
      }
    }
  }
</style>