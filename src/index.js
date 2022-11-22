import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuex from "vuex";
import AsyncComputed from 'vue-async-computed'
import PortalVue from 'portal-vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'

import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/app.scss'
import i18n from './i18n'

Vue.use(PortalVue)

Vue.use(AsyncComputed)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')