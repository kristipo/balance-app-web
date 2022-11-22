import { HEADERS } from "../../../api";
export default {
    async addRecord(expenseId, date, value, comment) {
        /* DISABLE FOR DEMO
        const res = await fetch(url, {
            ...HEADERS,
            method: "POST",
            "body": `${JSON.stringify({
                expenseId,
                date,
                value,
                comment
            })}`
        })

        const { id } = await res.json()
        return id
         */
    },

    async getPayments(year, month, limit=1000, from=0) {
        /* DISABLE FOR DEMO
        const res = await fetch(url, {
                HEADERS
            })
        const { records } = await res.json()

         */
        const records = require('./november-payments.json')

        return records
    },

    async deletePayment(id) {
        /* DISABLE FOR DEMO
        const res = await fetch(url, {
            ...HEADERS,
            method: "DELETE"
        })
        return res
         */
    },

    async updateRecord(id, expenseId, date, value, comment) {
        /* DISABLE FOR DEMO
        const res = await fetch(url, {
            ...HEADERS,
            method: "PATCH",
            "body": `${JSON.stringify({
                expenseId,
                date,
                value,
                comment
            })}`
        })

        return res

         */
    }
}