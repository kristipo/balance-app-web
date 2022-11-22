<template>
  <div v-else class="year-balance">
      <l-icon-button
          icon="calendar"
          class="calendar-button"
          @click="intervalModalVisible = true"
      />
    <div
        v-for="year in statsYears"
        class="year-summary"
    >
      <l-text
          :text="year"
          bold
          lg
          class="year-header"
      />
      <div
          class="months-container"
          :class="{ isMobile }"
      >
        <div v-for="month in balanceSummary[year]">
          <l-rows-table
              :items="month.items"
              within-remove
              group-bold
              @click="select(year, month.month)"
          />
        </div>
      </div>
    </div>
    <l-modal
        v-model="intervalModalVisible"
        :title="$t('balanceStats.interval')"
        :ok-text="$t('show')"
        :cancel-text="$t('cancel')"
        @ok="showAlert"
    >
      <div class="interval-modal-content">
        <div class="set-interval-buttons">
          <div
              class="text-button"
              @click="setDefaultInterval"
          >
            <l-text
                :text="$t('balanceStats.defaultInterval')"
                bold
                red
            />
          </div>
          <div
              class="text-button"
              @click="reset"
          >
            <l-text
                :text="$t('balanceStats.showAll')"
                bold
                red
            />
          </div>
        </div>
        <div class="interval">
          <l-form-label :value="$t('balanceStats.start')" />
          <b-form-select
              v-model="startMonth"
              :options="monthsList"
              value-field="value"
              text-field="label"
              class="date"
          />
          <b-form-select
              v-model="startYear"
              :options="yearsRange"
              class="date"
          />
        </div>
        <div class="interval">
          <l-form-label :value="$t('balanceStats.end')" />
          <b-form-select
              v-model="endMonth"
              :options="monthsList"
              value-field="value"
              text-field="label"
              class="date"
          />
          <b-form-select
              v-model="endYear"
              :options="yearsRange"
              class="date"
          />
        </div>
      </div>
    </l-modal>
  </div>
</template>

<script>
import LIconButton from "@/components/button/LIconButton";
import LModal from "@/components/LModal";
import LRowsTable from "@/components/LRowsTable";
import LText from "@/components/LText";
import {
  ACTION_LOAD_BALANCE_ON_INTERVAL,
  FULL_MONTH_NAME_FORMAT
} from "@/store/modules/balance";
import _ from "lodash";
import moment from "moment/moment";
import LFormLabel from "@/components/LFormLabel";

export default {
  name: "BalanceSummary",

  components: {
    LFormLabel,
    LModal,
    LIconButton,
    LText,
    LRowsTable
  },

  inject: ['isMobile', 'showAlert'],

  data() {
    return {
      balanceOnInterval: [],
      intervalModalVisible: false,
      start: null,
      end: null,
      startMonth: moment().get('month', 'MM') + 1,
      endMonth: moment().get('month', 'MM') + 1,
      endYear: moment().get('year') + 1,
      startYear: moment().get('year')
    }
  },

  computed: {
    balanceSummary() {
      return _(this.balanceOnInterval)
          .orderBy(m => m.month)
          .map(b => ({...b,
            items: {[this.getMonthName(b.month)]: _.toPairs(b.stats).map(([title, value]) => ({title: this.$t(`balanceStats.${title}`), value}))}
          }))
          .groupBy(b => b.year)
          .value()
    },

    currentYear() {
      return moment().get('year')
    },

    monthsList() {
      return _.range(1,13).map(month => ({
        label: moment().locale('ru').month(month - 1).format(FULL_MONTH_NAME_FORMAT),
        value: moment().locale('ru').month(month - 1).format('MM')
      }))
    },

    yearsRange() {
      return _.range(this.currentYear - 100, this.currentYear + 100)
    },

    statsYears() {
      return _.keys(this.balanceSummary)
    }
  },

  methods: {
    getMonthName(month) {
      return _.capitalize(moment().locale('ru').month(month - 1).format(FULL_MONTH_NAME_FORMAT))
    },

    reset() {
      this.startMonth = this.startYear = this.endMonth = this.endYear = null
      this.fetchBalance(null, null)
      this.showAlert()
    },

    select(year, month) {
      this.$emit('select', { year, month })
    },

    setDefaultInterval() {
      this.startMonth = moment().get('month', 'MM') + 1
      this.endMonth = moment().get('month') + 1
      this.endYear = moment().get('year') + 1
      this.startYear = moment().get('year')

      this.fetchSelectedInterval()
    },

    fetchSelectedInterval() {
      this.fetchBalance(`${this.startYear}-${this.startMonth}`, `${this.endYear}-${this.endMonth}`)
    },

    async fetchBalance(start, end) {
      this.balanceOnInterval = await this.$store.dispatch(
          ACTION_LOAD_BALANCE_ON_INTERVAL,
          { end, start }
      )
      this.intervalModalVisible = false
    }
  },

  created() {
    this.setDefaultInterval()
  }
}
</script>

<style scoped lang="scss">
.year-balance {
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 20px;

  .calendar-button {
    align-self: flex-end;
  }

  .year-summary {
    display: flex;
    flex-direction: column;

    .year-header {
      align-self: center;
      margin-bottom: 10px;
    }


    .months-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 40px;


      &.isMobile {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    }
  }
}

.interval-modal-content {
  display: flex;
  flex-direction: column;
  gap: 15px;

  .date + .date {
    margin-top: 10px;
  }

  .set-interval-buttons {
    display: flex;
    gap: 15px;

    .text-button {
      display: flex;
      border: 1px solid $primary;
      border-radius: 5px;
      padding: 2px 5px;
    }
  }
}

</style>