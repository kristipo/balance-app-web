import api from "../../../api";
import _ from 'lodash'
import moment from "moment";
import { selectedDateKeyBuilder } from "@/store/modules/balance";

import { ACTION_GET_CURRENT_BALANCE } from "@/store/modules/balance";

export const ACTION_FETCH_PAYMENTS = 'fetchPayments'
export const ACTION_CREATE_PAYMENT = 'createPayment'
export const ACTION_EDIT_PAYMENT = 'editPayment'
export const ACTION_REMOVE_PAYMENT = 'removePayment'
const MUTATION_ADD_PAYMENT = 'addPayment'
const MUTATION_LOAD_PAYMENTS = 'loadPayments'
const MUTATION_REMOVE_PAYMENT = 'removePayments'
const MUTATION_UPDATE_PAYMENT = 'updatePayments'

const STORE_KEY_DATE_FORMAT= 'MMMMYYYY'
const YEAR_KEY = 'year'
const MONTH_KEY = 'month'
const DATE_KEY = 'date'
export const DISPLAY_DATE_FORMAT = 'YYYY-MM-DD'

const dateToNumber = date => moment(date).get(DATE_KEY)
const fullDateToStoreKey = date => moment(date, DISPLAY_DATE_FORMAT).format(STORE_KEY_DATE_FORMAT)
const splitToYearAndMonth = date => {
    const [ year, month ] = moment(date, DISPLAY_DATE_FORMAT).format('YYYY,MM').split(',')
    return { year, month }
}

export default {
    state: {
        payments: {}
    },
    getters: {
        allPayments: (state) => ({ month, year }) => {
            return state.payments[selectedDateKeyBuilder(month, year)]
        }
    },
    mutations: {
        [MUTATION_ADD_PAYMENT](state, payment) {
            const storeKey = fullDateToStoreKey(payment.date)
            const payments = _.orderBy(
                [payment, ...state.payments[storeKey] || []],
                    p => dateToNumber(p.date), ['desc']
            )
            state.payments = {...state.payments, [storeKey]: payments}

        },

        [MUTATION_REMOVE_PAYMENT](state, { recordId, date }) {
            const keyStore = fullDateToStoreKey(date)
            state.payments = {
                ...state.payments,
                [keyStore]: state.payments[keyStore].filter(p => p.recordId !== recordId)
            }
        },

        [MUTATION_UPDATE_PAYMENT]({commit}, { payment, oldDate }) {
            this.commit(MUTATION_REMOVE_PAYMENT, { recordId: payment.recordId, date: oldDate || payment.date })
            this.commit(MUTATION_ADD_PAYMENT, payment)
        },

        [MUTATION_LOAD_PAYMENTS](state, { payments, year, month }) {
            state.payments = { ...state.payments, [selectedDateKeyBuilder(month, year)]: payments }
        },
    },
    actions: {
        async [ACTION_EDIT_PAYMENT]({ commit, dispatch }, { payment, oldDate }) {
            const { recordId, expenseId, date, value, comment } = payment
            await api.payments.updateRecord(recordId, expenseId, date, value, comment)

            const year = moment(oldDate || date).get(YEAR_KEY)
            const month = moment(oldDate || date).get(MONTH_KEY) + 1

            commit(MUTATION_UPDATE_PAYMENT, { payment, oldDate, year, month })
            dispatch(ACTION_GET_CURRENT_BALANCE, { year, month })
        },

        async [ACTION_CREATE_PAYMENT]({ commit, dispatch }, { payment }) {
            const { expenseId, date, value, comment } = payment
            const recordId = await api.payments.addRecord(expenseId, date, value, comment)
            const year = moment(date).get(YEAR_KEY)
            const month = moment(date).get(MONTH_KEY) + 1

            dispatch(ACTION_GET_CURRENT_BALANCE, { year, month })
            commit(MUTATION_ADD_PAYMENT, { ...payment, recordId })
        },

        async [ACTION_FETCH_PAYMENTS]({ commit }, { year, month }) {
            const payments = await api.payments.getPayments(year, month)

            commit(MUTATION_LOAD_PAYMENTS, { payments, year, month })
        },

        async [ACTION_REMOVE_PAYMENT]({ commit, dispatch }, { recordId, date }) {
            await api.payments.deletePayment(recordId)
            const { year, month } = splitToYearAndMonth(date)

            dispatch(ACTION_GET_CURRENT_BALANCE, { year, month })
            commit(MUTATION_REMOVE_PAYMENT, { recordId, date })
        }
    }
}