<template>
  <div class="balance-page">
    <div class="toolbar">
      <l-icon-button
          v-if="selectedDate != null"
          icon="back-arrow"
          large
          @click="$emit('update:selected-date', null)"
      />
      <l-icon-button
          v-if="selectedDate != null"
          icon="plus-square"
          large
          @click="paymentModalVisible = true"
      />
    </div>
    <l-date-picker-month
        :selected="selectedDate"
        @update:selected="$emit('update:selected-date', $event)"
    />
    <l-statistic-col :items="stats">
      <template #sumIncome="{ text, value }">
        <div class="incoming-group">
          <l-text v-if="!editIncomingMode || !isMobile" :text="text+':'" />
          <div class="incoming-value">
            <div
                v-if="!editIncomingMode"
                @click.stop="editIncomingMode = true"
            >
              <l-text number-type :text="value" />
            </div>
            <l-input-group
                v-else
                v-model="incomingInputValue"
                @enter="submitValue"
                @submit="submitValue"
                @cancel="editIncomingMode = false"
            />
          </div>
        </div>
      </template>
    </l-statistic-col>
    <l-statistic-col
        :items="expenses"
        :header="$t('cash.cost')"
        class="statistic"
        rolled-preview
        secondary
        collapse-button
    />
    <div v-if="payments.length === 0">
      <l-text :text="$t('cash.emptyPayments')" />
    </div>
    <l-rows-table
        :items="records"
        @click="edit"
        @remove="triggerRemove"
    />
    <l-add-payment-modal
        v-model="paymentModalVisible"
        :selected-date="selectedDate"
        :payment="payment"
    />
    <l-confirm-remove-modal
        v-model="confirmModalVisible"
        :payment="payment"
        @ok="remove(payment)"
    >
      <div v-if="payment !== null" class="removed-payment">
        <l-form-label class="prop-label" :value="$t('amount')" />
        <l-text
            number-type
            :text="payment.value"
        />
        <l-form-label class="prop-label" :value="$t('date')" />
        <l-text :text="formatRecordTableDate(payment.date)" />
        <l-form-label class="prop-label" :value="$t('type')" />
        <l-text :text="payment.expenseName" />
        <l-form-label class="prop-label" :value="$t('description')" />
        <l-text :text="payment.comment" />
      </div>
    </l-confirm-remove-modal>
  </div>
</template>

<script>
import _ from 'lodash'
import LStatisticCol from "@/components/LStatisticCol";
import { mapGetters } from 'vuex'
import {
  ACTION_FETCH_PAYMENTS,
  ACTION_REMOVE_PAYMENT
} from "@/store/modules/payments";
import {
  ACTION_GET_CURRENT_BALANCE,
  ACTION_UPDATE_INCOMES
} from "@/store/modules/balance";
import LText from "@/components/LText";
import LIconButton from "@/components/button/LIconButton";
import LModal from "@/components/LModal";
import moment from "moment";
import LAddPaymentModal from "@/components/LAddPaymentModal";
import LConfirmRemoveModal from "@/components/LConfirmRemoveModal";
import LDatePickerMonth from "@/components/LDatePickerMonth";
import FormInput from "../components/input/FormInput";
import LInputGroup from "@/components/input/LInputGroup";
import LFormLabel from "@/components/LFormLabel";
import LRowsTable from "@/components/LRowsTable";

const RECORD_DATE_FORMAT = 'DD MMMM, dd'
const LOCALE = 'ru'

export default {
  name: "Balance",

  components: {
    FormInput,
    LAddPaymentModal,
    LConfirmRemoveModal,
    LDatePickerMonth,
    LInputGroup,
    LFormLabel,
    LIconButton,
    LModal,
    LText,
    LStatisticCol,
    LRowsTable
  },

  props: {
    selectedDate: {
      type: Object,
      default: null
    }
  },

  inject: ['isMobile', 'showAlert'],

  data() {
    return {
      editIncomingMode: false,
      incomingInputValue: '',
      payment: null,
      paymentModalVisible: false,
      confirmModalVisible: false
    }
  },

  computed: {
    ...mapGetters(['allPayments']),

    stats() {
      const { month, year } = this.selectedDate
      const stats = this.$store.getters.currentBalanceStats(month, year)
      return _(stats)
          .toPairs()
          .map(([key, value]) => [key, { text: this.$t(`balanceStats.${key}`), value, key }])
          .fromPairs()
          .value()
    },

    expenses() {
      const { month, year} = this.selectedDate
      const expenses = this.$store.getters.currentExpenses(month, year)
      return expenses
          .map(item => ({
            ...item,
            key: item.expenseId || item.expenseName,
            text: item.expenseName,
            value: item.sumValue
          }))
    },

    payments() {
      return this.allPayments(this.selectedDate) || []
    },

    records() {
      return _(this.payments)
          .map(p => ({
            ...p,
            group: moment(p.date).locale(LOCALE).format(RECORD_DATE_FORMAT),
            title: p.expenseName
          }))
          .groupBy(p => p.group).value()
    }
  },

  watch: {
    editIncomingMode(value) {
      if (value) {
        this.incomingInputValue = ''
      }
    },

    paymentModalVisible(value) {
      if (!value) {
        this.payment = null
      }
    },

    selectedDate: {
      async handler(value) {
        if (value == null) return

        this.fetchData(value)
      },

      immediate: true
    }
  },

  methods: {
    moment,
    edit(payment) {
      this.paymentModalVisible = true
      this.payment = {...payment}
    },

    async fetchData(date) {
      const inState = this.$store.getters.balanceLoaded(date)

      if (!inState) {
        await this.$store.dispatch(ACTION_FETCH_PAYMENTS, date)
        await this.$store.dispatch(ACTION_GET_CURRENT_BALANCE, date)
      }
    },

    formatRecordTableDate(d) {
      return moment(d).locale(LOCALE).format(RECORD_DATE_FORMAT)
    },

    remove(payment) {
      this.$store.dispatch(
          ACTION_REMOVE_PAYMENT,
          payment
      )
      this.payment = null
      this.showAlert()
    },

    async submitValue() {
      await this.$store.dispatch(ACTION_UPDATE_INCOMES, {
        value: _.toNumber(this.incomingInputValue),
        ...this.selectedDate
      })

      this.editIncomingMode = false
      this.showAlert()
    },

    triggerRemove(p) {
      this.payment = p
      this.confirmModalVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
  .balance-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 30px;
    padding: 20px;

    .toolbar {
      display: flex;
      justify-content: space-between;
    }
  }

  .modal-label {
    margin-bottom: 10px;
  }

  .new-item-properties {
    gap: 20px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    .value {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }

  .incoming-group {
    display: flex;
    height: fit-content;

    .controls {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-left: 5px;
    }

    .incoming-value {
      margin-left: 5px;
      display: flex;
      cursor: pointer;
      height: fit-content;
    }
  }

  .removed-payment {
    display: grid;
    grid-template-columns: 100px 1fr;
    row-gap: 10px;
  }

  .prop-label {
    color: $secondary;
  }
</style>