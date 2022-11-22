import balance from "@/api/balance/balance";
import employeesGroups from "@/api/employeesGroups";
import employees from "@/api/employees";
import expenses from "@/api/expenses";
import groups from "@/api/expensesGroups/expensesGroups";
import incomes from "@/api/incomes";
import payments from "@/api/payments/payments";

export const HEADERS = {
    "credentials": "include",
    "accept": "application/json",
    "Content-Type": "application/json"
}

export const requestBodyArgsFormatter = args => {
    return `${JSON.stringify({
        ...args
    })}`
}

const api = {
    balance,
    employeesGroups,
    employees,
    expenses,
    groups,
    incomes,
    payments
}

export default api