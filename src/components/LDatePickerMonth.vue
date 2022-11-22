<template>
  <div class="l-date-picker-month">
    <div
        v-if="!show"
        class="header"
        @click="toggleVisibility"
    >
      <l-text
          :text="header"
          class="month-picker-header"
      />
    </div>
    <template v-else>
      <div class="year-input">
        <l-icon-button
            icon="arrow-left"
            large
            @click="$emit('update:selected', {...selected, year: selected.year - 1 })"
        />
        <b-form-select
            :value="selected.year"
            :options="yearsList"
            size="sm"
            text-field="value"
            value-field="value"
            autofocus
            @input="$emit('update:selected', { ...selected, year: $event })"
        />
        <l-icon-button
            icon="arrow-right"
            large
            @click="$emit('update:selected', {...selected, year: selected.year + 1 })"
        />
      </div>
      <div class="l-date-picker-layout">
        <div
            v-for="(month, number) in monthsList"
            :key="number"
            class="month"
            :class="{ selected: `${selected.month}` === number }"
            @click="updateMonth(number)"
        >
          <l-text :text="month.label" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import LIconButton from "@/components/button/LIconButton";
import LText from "@/components/LText";
import _ from 'lodash'
import moment from "moment";
import { FULL_MONTH_NAME_FORMAT} from "@/store/modules/balance";
export default {
  name: "LDatePickerMonth",

  components: {
    LIconButton,
    LText
  },

  emits: [
    'month-selector-visible',
    'update:selected'
  ],

  props: {
    selected: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      show: false
    }
  },

  computed: {
    header() {
      return `${this.monthsList[this.selected.month].label}, ${this.selected.year}`
    },

    monthsList() {
      return _(_.range(1,13)).map(month => [ month, {
        label: _.capitalize(moment().locale('ru').month(month - 1).format(FULL_MONTH_NAME_FORMAT)),
        value: month
      }]).fromPairs().value()
    },

    yearsList() {
      return _.range(2010, 2100).map(y => ({ value: y }))
    }
  },

  methods: {
    toggleVisibility() {
      this.show = !this.show
      this.$emit('month-selector-visible', this.show)
    },

    updateMonth(month) {
      this.$emit('update:selected', { ...this.selected, month: _.toNumber(month) })
      this.toggleVisibility()
    }
  }
}
</script>

<style scoped lang="scss">
  .l-date-picker-month {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;

    .header {
      display: flex;
      font-weight: 800;

      .month-picker-header {
        font-size: 22px;
      }
    }

    .year-input {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 20px;
      gap: 20px;
    }

    .l-date-picker-layout {
      width: 100%;
      display: grid;
      padding: 20px;
      gap: 10px;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr;
      border: 1px solid black;
      border-radius: 5px;
    }

    .month {
      display: flex;
      justify-content: center;
      padding: 5px;
      cursor: pointer;

      &.selected {
        background: $lulu-pink;
        border-radius: 5px;
      }
    }
  }
</style>