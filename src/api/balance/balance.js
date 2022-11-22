import { HEADERS } from "../../../api";

export default {
    async balanceOnInterval(start, end) {
        /* DISABLED FOR DEMO

        const request = start !== null && end !== null ? `start=${start}&end=${end}` : ''
        const res = await fetch(url + request, {
            ...HEADERS
        })
        const { data } = await res.json()
         */
        const data = require('./last-year-balance-interval.json')
        return data
    },

    async getCurrentBalance(year, month) {
        /* DISABLED FOR DEMO
        
        const res = await fetch(url, {
            ...HEADERS
        })
        */
        const data = require('./november-balance.json')

        return data
    },

    async addSalary(employeeId, year, month, bonusPart, fixedPart) {
        /* DISABLED FOR DEMO
            
        await fetch(url, {
            ...HEADERS,
            method: "PUT",
            "body": `${JSON.stringify({salaries: [{ employeeId, bonusPart, fixedPart }]})}`
        })
         */
    }
}