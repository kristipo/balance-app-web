<template>
  <div class="menu-bar">
    <b-navbar
        toggleable="lg"
        sticky
    >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click="goHome">{{ $t('cash.expenses') }}</b-nav-item>
          <b-nav-item @click="goPage(WAGE_MODE)">{{ $t('cash.wage') }}</b-nav-item>
          <b-nav-item @click="goPage(SETTINGS_MODE)">{{ $t('cash.settings') }}</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
const SETTINGS_MODE = 'settings'
const WAGE_MODE = 'wage'
const EXPENSES_MODE = 'expenses'

export default {
  name: "LMenu",

  data() {
    return {
      EXPENSES_MODE,
      SETTINGS_MODE,
      WAGE_MODE
    }
  },

  methods: {
    goHome() {
      this.$router.push('/')
    },

    goPage(page) {
      this.$router.push(`/${page}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu-bar {
    background: $lulu-pink;
    z-index: 0;
  }
</style>