import { HEADERS, requestBodyArgsFormatter } from "../../api";
export default {
    async fetchEmployeesGroups() {
        /* DISABLE FOR DEMO
        const res = await fetch('url, {
            ...HEADERS
        })
        const { groups } = await res.json()

         */
        const groups = require('./employeesGroups/employees-groups.json')
        return groups
    },

    async createGroup(groupName) {
        /* DISABLE FOR DEMO
        const res = await fetch(url, {
            ...HEADERS,
            "method": "POST",
            body: requestBodyArgsFormatter({ groupName })
        })

        const { id } = await res.json()
        return id
         */
    },

    async editGroup(groupName, id) {
        /* DISABLE FOR DEMO
        const res = await fetch(url, {
            ...HEADERS,
            "method": "PATCH",
            body: requestBodyArgsFormatter({ groupName })
        })

        return res

         */
    },

    async removeGroup(id) {
        /* DISABLE FOR DEMO
        await fetch(url, {
            ...HEADERS,
            method: 'DELETE'
        })

         */
    }
}