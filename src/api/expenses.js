import {HEADERS} from "../../api";
export default {
    async createExpense(expenseName, groupId) {
        /* DISABLE FOR DEMO
        const res = await fetch('url, {
            ...HEADERS,
            method: "POST",
            "body": `${JSON.stringify({
                groupId,
                expenseName
            })}`
        })

        const { id } = await res.json()
        return id

         */
    },

    async editExpense(expenseName, expenseId, groupId) {
        /* DISABLE FOR DEMO
        const res = await fetch(`url`,{
            ...HEADERS,
            method: "PATCH",
            "body": `${JSON.stringify({
                groupId,
                expenseName
            })}`
        })
        return res

         */
    },

    async remove(id) {
        /* DISABLE FOR DEMO
        const res = await fetch(`url, {
            ...HEADERS,
            method: 'DELETE'
        })

        return res

         */
    }
}