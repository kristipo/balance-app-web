import { HEADERS, requestBodyArgsFormatter } from "../../api";
export default {
    async addEmployee(employeeName, groupId) {
        /* DISABLE FOR DEMO
        const res = await fetch(url, {
            ...HEADERS,
            "method": "POST",
            "body": requestBodyArgsFormatter({ employeeName, groupId })
        })

        const { id } = await res.json()
        return id

         */
    },

    async editEmployee(employeeName, employeeId, groupId) {
        /* DISABLE FOR DEMO
        const res = await fetch(url, {
            ...HEADERS,
            method: "PATCH",
            "body": requestBodyArgsFormatter({ employeeName, groupId })
        })
        return res

         */
    },

    async removeEmployee(id) {
        /* DISABLE FOR DEMO
        const res = await fetch(url, {
            ...HEADERS,
            method: 'DELETE'
        })

        return res
        */
    }
}