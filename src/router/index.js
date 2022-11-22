import Vue from 'vue'
import VueRouter from 'vue-router'
import MonthlyStatistic from "@/views/MonthlyStatistic";
import Settings from "@/views/Settings";
import Wage from "@/views/Wage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MonthlyStatistic
  },
  {
    path: '/settings',
    component: Settings
  },
  {
    path: '/wage',
    component: Wage
  }
]

const router = new VueRouter({
  routes
})

export default router
