import api from "../../../api";
import _ from 'lodash'
import { filterGroups, groupsByIds, orderGroups, orderGroupItems } from "@/store/modules/employeesGroups";
export const ACTION_ADD_EXPENSES_GROUP = 'add-expenses-group'
export const ACTION_REMOVE_EXPENSES_GROUP = 'delete-expenses-group'
export const ACTION_EDIT_EXPENSES_GROUP = 'edit-expenses-group'
export const ACTION_EDIT_EXPENSE = 'edit-expense'
export const ACTION_FETCH_EXPENSES_GROUPS = 'fetch-expenses-groups'

export const ACTION_CREATE_EXPENSE = 'create-expense'
export const ACTION_REMOVE_EXPENSE = 'remove-expense'
const MUTATION_ADD_GROUP = 'add-group'
const MUTATION_DELETE_GROUP = 'delete-group'
const MUTATION_LOAD_GROUPS = 'loadGroups'
const MUTATION_UPDATE_GROUP = 'update-group'

const MUTATION_ADD_EXPENSE = 'add-expense'
const MUTATION_EDIT_EXPENSE = 'edit-expense'
const MUTATION_DELETE_EXPENSE = 'delete-expense'
const EXPENSE_NAME_KEY = 'expenseName'

export default {
    state: {
        groups: {}
    },

    getters: {
        expensesGroups(state) {
            return orderGroups(state.groups)
        },

        allExpenses(state) {
            return _(state.groups)
                .flatMap(g => g.expenses)
                .sortBy(ex => _.lowerCase(ex.expenseName))
                .value()
        }
    },

    mutations: {
        [MUTATION_LOAD_GROUPS](state, { groups }) {
            state.groups = groupsByIds(groups)
        },

        [MUTATION_ADD_GROUP](state, group) {
            const newGroup = {...group, expenses: []}
            state.groups = {...state.groups, [group.groupId]: newGroup}
        },

        [MUTATION_ADD_EXPENSE](state, { expenseName, expenseId, groupId}) {
            const groupExpenses = [...state.groups[groupId].expenses, {expenseName, expenseId}]
            state.groups[groupId].expenses = orderGroupItems(groupExpenses, EXPENSE_NAME_KEY)

        },

        [MUTATION_EDIT_EXPENSE](state, { expenseName, expenseId, groupId }) {
            //TODO: implement

            // const updatedExpense = state.groups[groupId].expenses.filter(exp => exp.id === expenseId)
            // updatedExpense.expenseName = expenseName
        },

        [MUTATION_DELETE_GROUP](state, groupId) {
            state.groups = filterGroups(state.groups, groupId)
        },

        [MUTATION_DELETE_EXPENSE](state, { groupId, expenseId }) {
            //TODO: implement

        },

        [MUTATION_UPDATE_GROUP](state, { groupName, groupId }) {
            const group = state.groups[groupId]
            state.groups[groupId] = {...group, groupName}
        }
    },

    actions: {
        async [ACTION_ADD_EXPENSES_GROUP]({commit}, { name }) {
            const groupId = await api.groups.createGroup(name)
            commit(MUTATION_ADD_GROUP, { groupName: name, groupId })
        },

        async [ACTION_CREATE_EXPENSE]({commit}, {groupId, name}) {
            const expenseId = await api.expenses.createExpense(name, groupId)

            commit(MUTATION_ADD_EXPENSE, {expenseId, expenseName: name, groupId})
        },

        async [ACTION_REMOVE_EXPENSE]({ dispatch }, { expenseId }) {
            await api.expenses.remove(expenseId)
            dispatch(ACTION_FETCH_EXPENSES_GROUPS)
        },

        async [ACTION_REMOVE_EXPENSES_GROUP]({commit}, { groupId }) {
            await api.groups.deleteGroup(groupId)

            commit(MUTATION_DELETE_GROUP, groupId)
        },

        async [ACTION_EDIT_EXPENSES_GROUP]({commit}, { name, groupId }) {
            await api.groups.editGroup(name, groupId)
            commit(MUTATION_UPDATE_GROUP, { groupName: name, groupId })
        },

        async [ACTION_EDIT_EXPENSE]({commit, dispatch}, { name, groupItemId, groupId }) {
            await api.expenses.editExpense(name, groupItemId, groupId)

            dispatch(ACTION_FETCH_EXPENSES_GROUPS)
            // commit(MUTATION_EDIT_EXPENSE, { expenseName: name, expenseId: groupItemId, groupId })
        },

        async [ACTION_FETCH_EXPENSES_GROUPS]({ commit }) {
            const groups = await api.groups.getGroups()

            commit(MUTATION_LOAD_GROUPS, { groups })

            return groups
        }
    }
}