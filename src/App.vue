<template>
  <div id="app">
    <b-alert
        :show="alertVisible"
        class="lulu-alert"
        variant="warning"
    >{{ $t('alertMessage') }}</b-alert>
    <l-menu />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import LMenu from "@/components/LMenu";
import MonthlyStatistic from "@/views/MonthlyStatistic";
import Settings from "@/views/Settings";
import Wage from "@/views/Wage";

const MOBILE_AGENTS = [
  /Android/i,
  /webOS/i,
  /iPhone/i,
  /iPad/i,
  /iPod/i,
  /BlackBerry/i,
  /Windows Phone/i
]
export default {
  name: "App",

  components: {
    LMenu,
    MonthlyStatistic,
    Settings,
    Wage
  },

  provide() {
    return {
      isMobile: this.isMobile,
      showAlert: this.showAlert
    }
  },

  data() {
    return {
      alertVisible: false
    }
  },

  computed: {
    isMobile() {
      return MOBILE_AGENTS.some(a => navigator.userAgent.match(a))
    }
  },

  methods: {
    showAlert() {
      this.alertVisible = true

      setTimeout( () => {
        this.alertVisible = false
      }, 2000)
    }
  }
}
</script>

<style scoped lang="scss">
@import "./assets/main.css";
@import "assets/app";

#app {
  height: 100%;
  width: 100%;
  background-color: $body-bg;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .lulu-alert {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 56px;
  }

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: $body-bg;
    overflow: auto;
  }
}
</style>