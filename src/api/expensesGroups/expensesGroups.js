import { HEADERS } from "../../../api";

export default {
    async createGroup(name) {
        /*
        const res = await fetch('url, {
            ...HEADERS,
            method: "POST",
            "body": `${JSON.stringify({
                groupName: name
            })}`

        })
        const { id } = await res.json()
        return id

         */
    },

    async deleteGroup(id) {
        /*
        await fetch(`url, {
            ...HEADERS,
            method: 'DELETE'
        })

         */
    },

    async editGroup(name, id) {
        /*
        const res = await fetch(`url, {
            ...HEADERS,
            method: "PATCH",
            "body": `${JSON.stringify({
                groupName: name
            })}`
        })

        return res

         */
    },

    async getGroups() {
        /*
        const res = await fetch('url, {
            ...HEADERS
        })
        const { groups } = await res.json()

         */

        const groups = require('./expenses-groups.json')
        return groups
    }
}