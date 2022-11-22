import Vue from 'vue'
import Vuex from 'vuex'
import balance from "@/store/modules/balance";
import employeesGroups from "@/store/modules/employeesGroups";
import expensesGroups from "@/store/modules/expensesGroups";
import payments from "./modules/payments";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    balance,
    employeesGroups,
    expensesGroups,
    payments
  }
})
