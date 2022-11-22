<template>
  <div class="monthly-balance-page">
    <balance
        v-if="selected !== null"
        :selected-date.sync="selected"
    />
    <balance-summary
        v-else
        @select="selected = $event"
    />
  </div>
</template>

<script>
import Balance from "@/views/Balance";
import BalanceSummary from "@/views/BalanceSummary";
import LFormLabel from "@/components/LFormLabel";
import LTable from "@/components/LTable";
import LText from "@/components/LText";
import LIconButton from "@/components/button/LIconButton";
import moment from "moment";

export default {
  name: "MonthlyBalanceStatistic",

  components: {
    Balance,
    BalanceSummary,
    LFormLabel,
    LIconButton,
    LTable,
    LText
  },

  data() {
    return {
      selected: { month: moment().get('month') + 1, year: moment().get('year') }
    }
  }
}
</script>

<style scoped lang="scss">
  .monthly-balance-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 0;

    .toolbar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: 20px;

      &.back-button-allowed {
        justify-content: space-between;
      }

      .left-side-controls {
        display: flex;
        gap: 10px;
      }
    }
  }
</style>