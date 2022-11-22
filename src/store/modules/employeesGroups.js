import api from "../../../api";
import _ from 'lodash'

export const ACTION_CREATE_EMPLOYEES_GROUP = 'create-employees-group'
export const ACTION_EDIT_EMPLOYEES_GROUP = 'edit-employees-group'
export const ACTION_FETCH_EMPLOYEES_GROUPS = 'fetch-employees-groups'
export const ACTION_REMOVE_EMPLOYEES_GROUP = 'remove-employees-group'
export const ACTION_ADD_EMPLOYEE = 'add-employee'
export const ACTION_EDIT_EMPLOYEE = 'edit-employee'
export const ACTION_REMOVE_EMPLOYEE = 'remove-employee'
const MUTATION_ADD_EMPLOYEES_GROUP = 'add-employees-group'
const MUTATION_LOAD_EMPLOYEES_GROUP = 'load-employees-group'
const MUTATION_UPDATE_EMPLOYEES_GROUP = 'update-employees-group'
const MUTATION_REMOVE_EMPLOYEES_GROUP = 'remove-employees-group-from-store'
const MUTATION_ADD_EMPLOYEE = 'mutation-add-employee'
const MUTATION_REMOVE_EMPLOYEE = 'mutation-remove-employee'
const MUTATION_UPDATE_EMPLOYEE = 'mutation-update-employee'

const EMPLOY_NAME_KEY = 'employeeName'

export const filterGroups = (groups, groupId) => _(groups)
    .toPairs()
    .filter(([id]) => id !== _.toString(groupId))
    .fromPairs()
    .value()

export const groupsByIds = groups => _(groups)
    .map(g => [g.groupId, g])
    .fromPairs()
    .value()

export const orderGroups = groups => _(groups)
    .values()
    .sortBy(g => _.lowerCase(g.groupName))
    .value()

export const orderGroupItems = (items, key) => _.sortBy(items, item => _.lowerCase(item[key]))

export default {
    state: {
        groups: {}
    },

    getters: {
        employeesGroups(state) {
            return orderGroups(state.groups)
        }
    },

    mutations: {
        [MUTATION_ADD_EMPLOYEES_GROUP](state, group) {
            const newGroup = {...group, employees: []}
            state.groups = {...state.groups, [group.groupId]: newGroup }
        },

        [MUTATION_ADD_EMPLOYEE](state, { employeeName, groupId, employeeId }) {
            const employees = [...state.groups[groupId].employees, { employeeName, employeeId}]
            state.groups[groupId].employees = orderGroupItems(employees, EMPLOY_NAME_KEY)
        },

        [MUTATION_LOAD_EMPLOYEES_GROUP](state, { groups }) {
            state.groups = groupsByIds(groups)
        },

        [MUTATION_REMOVE_EMPLOYEES_GROUP](state, groupId) {
            state.groups = filterGroups(state.groups, groupId)
        },

        [MUTATION_UPDATE_EMPLOYEES_GROUP](state, { groupName, groupId }) {
            const group = state.groups[groupId]
            state.groups[groupId] = {...group, groupName }
        },

        [MUTATION_REMOVE_EMPLOYEE](state, id) {
            //TODO: implement this
        },

        [MUTATION_UPDATE_EMPLOYEE]() {
            //TODO: implement this
        }
    },

    actions: {
        async [ACTION_ADD_EMPLOYEE]({ commit }, { name, groupId }) {
            const employeeId = await api.employees.addEmployee(name, groupId)
            commit(MUTATION_ADD_EMPLOYEE, { employeeName: name, groupId, employeeId })
        },

        async [ACTION_CREATE_EMPLOYEES_GROUP]({ commit }, { name }) {
            const groupId = await api.employeesGroups.createGroup(name)

            commit(MUTATION_ADD_EMPLOYEES_GROUP, { groupName: name, groupId })
        },

        async [ACTION_EDIT_EMPLOYEE]({ dispatch }, { name, groupItemId, groupId }) {
            await api.employees.editEmployee(name, groupItemId, groupId)

            dispatch(ACTION_FETCH_EMPLOYEES_GROUPS)
            // commit(MUTATION_UPDATE_EMPLOYEE, { employeeName: name, employeeId: groupItemId, groupId })
        },

        async [ACTION_EDIT_EMPLOYEES_GROUP]({ commit }, { name,  groupId }) {
            await api.employeesGroups.editGroup(name, groupId)

            commit(MUTATION_UPDATE_EMPLOYEES_GROUP, { groupName: name, groupId })
        },

        async [ACTION_FETCH_EMPLOYEES_GROUPS]({ commit }) {
            const groups = await api.employeesGroups.fetchEmployeesGroups()

            commit(MUTATION_LOAD_EMPLOYEES_GROUP, { groups })
        },

        async [ACTION_REMOVE_EMPLOYEE]({ dispatch }, { employeeId }) {
            await api.employees.removeEmployee(employeeId)
            dispatch(ACTION_FETCH_EMPLOYEES_GROUPS)
        },

        async [ACTION_REMOVE_EMPLOYEES_GROUP]({ commit }, { groupId }) {
            await api.employeesGroups.removeGroup(groupId)

            commit(MUTATION_REMOVE_EMPLOYEES_GROUP, groupId)
        },
    }
}