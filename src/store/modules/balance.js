import api from "../../../api";
import _ from 'lodash'
import moment from "moment";
import { orderGroupItems } from "@/store/modules/employeesGroups";
import i18n from "@/i18n";

export const ACTION_GET_CURRENT_BALANCE = 'getCurrentBalance'
export const ACTION_LOAD_BALANCE_ON_INTERVAL = 'loadBalanceOnInterval'
export const ACTION_UPDATE_INCOMES = 'updateIncomes'
export const ACTION_ADD_SALARY = 'addSalary'
const MUTATION_LOAD_CURRENT_BALANCE = 'loadCurrentBalance'

export const FULL_MONTH_NAME_FORMAT = 'MMMM'
export const BALANCE_INTERVAL_DATE_FORMAT = 'YYYY-MM'

export const selectedDateKeyBuilder = (month, year) => {
    return `${moment(month, 'M').format(FULL_MONTH_NAME_FORMAT)}${year}`
}

export default {
    state: {
        expenses: {},
        salaries: {},
        stats: {},
        balance: {}
    },

    getters: {
        currentBalanceStats: (state) => (month, year) => {
            return state.stats[selectedDateKeyBuilder(month, year)]
        },

        currentExpenses: (state) => (month, year) => {
            const storeKey = selectedDateKeyBuilder(month, year)

            return orderGroupItems(state.expenses[storeKey],'expenseName')
        },

        balanceLoaded: (state) => ({ month, year }) => {
            const storeKey = selectedDateKeyBuilder(month, year)
            return state.stats[storeKey] != null
        },

        selectedSalaries: (state) => (month, year) => {
            return state.salaries[selectedDateKeyBuilder(month, year)]?.details
        }
    },

    mutations: {
        [MUTATION_LOAD_CURRENT_BALANCE](state, { year, month, balance }) {
            const key = selectedDateKeyBuilder(month, year)
            const expenses = [
                ..._.flatMap(balance.expenses, group => group.items),
                { expenseName: i18n.t('wage.salaries'), sumValue: balance.salaries.sumValue}

            ]
            state.salaries = {...state.salaries, [key]: balance.salaries}
            state.stats = {...state.stats, [key]: balance.stats}
            state.expenses = {...state.expenses, [key]: expenses}
        }
    },

    actions: {
        async [ACTION_ADD_SALARY]({ dispatch }, { month, year, employeeId, fixedPart, bonusPart }) {
            await api.balance.addSalary(employeeId, year, month, _.toNumber(bonusPart), _.toNumber(fixedPart))
            await dispatch(ACTION_GET_CURRENT_BALANCE, { year, month })
        },

        async [ACTION_GET_CURRENT_BALANCE]({ commit }, { year, month }) {
            const balance = await api.balance.getCurrentBalance(year, month)
            commit(MUTATION_LOAD_CURRENT_BALANCE, { year, month, balance })
            return balance
        },

        async [ACTION_LOAD_BALANCE_ON_INTERVAL]({ commit }, { start, end }) {
            const res = await api.balance.balanceOnInterval(start, end)
            return res
        },

        async [ACTION_UPDATE_INCOMES]({ dispatch }, { value, year, month }) {
            await api.incomes.updateIncomes(value, year, month)

            dispatch(ACTION_GET_CURRENT_BALANCE, { year, month })
        },
    }
}