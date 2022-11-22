<template>
  <l-modal
      :value="value"
      :title="$t('cash.createPayment')"
      :ok-disabled="disableSubmit"
      :ok-text="$t(`${editMode ? 'edit' : 'add'}`)"
      @ok="submit"
      @hide="$emit('input', false)"
  >
    <div class="form-item">
      <l-form-label :value="$t('cash.paymentType')" />
      <b-form-select
          v-model="expenseId"
          :options="expenses"
          value-field="key"
          size="sm"
      />
    </div>
    <div
        v-if="expenseId !== EXPENSE_SELECTOR_PLACEHOLDER"
        class="form-item-container"
    >
      <div class="form-item">
        <l-form-label :value="$t('cash.paymentDate')" />
        <b-form-datepicker
            v-model="date"
            size="sm"
            locale="ru"
        />
      </div>
      <form-input
          v-model="amountInputValue"
          :label="$t('cash.amount')"
          :state="amountInputState"
          :error-message="$t('addModal.errorMessage')"
          autofocus
      />
      <div class="form-item">
        <form-input
            v-model="description"
            :label="$t('cash.description')"
            text-area-mode
        />
      </div>
    </div>
  </l-modal>
</template>

<script>
import LModal from "@/components/LModal";
import FormInput from "@/components/input/FormInput";
import LDoubleInput from "@/components/input/LDoubleInput";
import LFormLabel from "@/components/LFormLabel";
import moment from 'moment'
import {
  DISPLAY_DATE_FORMAT,
  ACTION_CREATE_PAYMENT,
  ACTION_EDIT_PAYMENT
} from "@/store/modules/payments";

import _ from "lodash";
import { ACTION_FETCH_EXPENSES_GROUPS } from "@/store/modules/expensesGroups";
import { mapGetters } from "vuex";

const EXPENSE_SELECTOR_PLACEHOLDER = 'placeholder'

export default {
  name: "LAddPaymentModal",

  components: {
    LDoubleInput,
    LModal,
    FormInput,
    LFormLabel
  },

  inject: ['showAlert'],

  props: {
    payment: {
      type: Object,
      default: null
    },

    selectedDate: {
      type: Object,
      required: true
    },

    value: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      amountInputValue: '',
      date: null,
      description: '',
      decimalValue: '',
      expenseId: null,
      oldDate: '',
      EXPENSE_SELECTOR_PLACEHOLDER
    }
  },

  watch: {
    value: {
      handler(value) {
        if (!value) {
          this.reset()
          return
        }
        this.initData()
      },

      immediate: true
    }
  },

  computed: {
    ...mapGetters(['allExpenses']),

    amount() {
      return _.toNumber(this.amountInputValue) || null
    },

    amountInputState() {
      return this.amount == null && !_.isEmpty(this.amountInputValue) ? false : null
    },

    currentPayment() {
      return {
        recordId: this.payment?.recordId,
        expenseId: this.expenseId,
        expenseName: this.expenseNameById[this.expenseId],
        date: this.date,
        value: this.amount,
        comment: this.description
      }
    },

    disableSubmit() {
      return _.isEmpty(`${this.amountInputValue}`) || this.amount == null
    },

    editMode() {
      return this.payment?.recordId != null
    },

    expenses() {
      return [
          {
            key: EXPENSE_SELECTOR_PLACEHOLDER,
            text: this.$t(`cash.${EXPENSE_SELECTOR_PLACEHOLDER}`)
          },
        ...this.allExpenses.map(ex => ({ ...ex, key: ex.expenseId, text: ex.expenseName }))]
    },

    expenseNameById() {
      return _(this.allExpenses)
          .map(exp => [exp.expenseId, exp.expenseName])
          .fromPairs()
          .value()
    },

    currentDate() {
      const { year, month } = this.selectedDate
      return month === this.todayDateMonth ? this.todayDate : `${year}-${month}-01`
    },

    todayDateMonth() {
      return moment().get('month') + 1
    },

    todayDate() {
      return moment().format(DISPLAY_DATE_FORMAT)
    }
  },

  methods: {
    initData() {
      this.expenseId = this.payment?.expenseId || EXPENSE_SELECTOR_PLACEHOLDER
      this.date = this.payment?.date || this.currentDate
      this.oldDate = this.payment?.date
      this.amountInputValue = this.payment?.value || ''
      this.description = this.payment?.comment || ''

    },

    reset() {
      this.amountInputValue = ''
      this.date = null
      this.oldDate = ''
      this.description = ''
      this.expenseId = EXPENSE_SELECTOR_PLACEHOLDER
    },

    async submit() {
      this.$store.dispatch(
          this.editMode ?
              ACTION_EDIT_PAYMENT :
              ACTION_CREATE_PAYMENT,
          {
            payment: this.currentPayment,
            oldDate: this.oldDate
          }
      )
      this.$emit('input', false)

      this.showAlert()
    },

    moment
  },

  async created() {
    await this.$store.dispatch(ACTION_FETCH_EXPENSES_GROUPS)
  }
}
</script>

<style scoped lang="scss">
  .form-item-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
  }

  .form-item {
    display: flex;
    flex-direction: column;
  }

</style>