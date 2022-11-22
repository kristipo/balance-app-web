<template>
<div class="wage-page">
  <div class="toolbar">
    <l-date-picker-month
        :selected.sync="selectedDate"
        @month-selector-visible="addButtonVisible = !$event"
    />
    <l-icon-button
        v-if="addButtonVisible"
        icon="plus-square"
        large
        @click="modalVisible = true"
    />
  </div>
  <l-collapse
        v-for="group in salaries"
        :key="group.groupId"
        :header="group.groupName"
        init-collapsed
    >
      <l-table
          :header="header"
          :items="group.items"
          @click="edit"
      />
  </l-collapse>
  <l-add-wage-modal
      :value="modalVisible"
      :items="salaries"
      :salary="selectedSalary"
      @hide="modalVisible = false"
      @submit="submit"
  />
</div>
</template>

<script>
import LAddWageModal from "@/components/LAddWageModal";
import LCollapse from "@/components/LCollapse";
import LDatePickerMonth from "@/components/LDatePickerMonth";
import LIconButton from "@/components/button/LIconButton";
import LText from "@/components/LText";
import LTable from "@/components/LTable";
import { mapGetters } from "vuex";
import { ACTION_FETCH_EMPLOYEES_GROUPS } from "@/store/modules/employeesGroups";
import { ACTION_ADD_SALARY, ACTION_GET_CURRENT_BALANCE } from "@/store/modules/balance";

import moment from "moment";
const EMPLOYEE_NAME = 'employeeName'
const SALARY_TABLE_HEADER = [
  'employeeName',
  'bonusPart',
  'fixedPart',
]
export default {
  name: "Wage",

  components: {
    LAddWageModal,
    LCollapse,
    LDatePickerMonth,
    LIconButton,
    LText,
    LTable
  },

  inject: ['showAlert'],

  data() {
    return {
      addButtonVisible: true,
      modalVisible: false,
      selectedSalary: null,
      selectedDate: {
        month: moment().get('month') + 1,
        year: moment().get('year')
      },
      EMPLOYEE_NAME
    }
  },

  computed: {
    ...mapGetters(['employeesGroups', 'selectedSalaries']),

    header() {
      return SALARY_TABLE_HEADER.map(title => ({
        key: title,
        text: this.$t(`wage.${title}`),
        isNumber: title !== EMPLOYEE_NAME
      }))
    },

    salaries() {
      return this.selectedSalaries(this.selectedDate?.month, this.selectedDate?.year)
    }
  },

  watch: {
    selectedDate: {
      async handler(value) {
        await this.$store.dispatch(ACTION_GET_CURRENT_BALANCE, value)
      },
      immediate: true
    },

    modalVisible(value) {
      if (!value) {
        this.selectedSalary = null
      }
    }
  },

  methods: {
    edit(item) {
      this.selectedSalary = item
      this.modalVisible = true
    },

    async submit(salary) {
      this.$store.dispatch(ACTION_ADD_SALARY, {
        ...salary,
        ...this.selectedDate
      })
      this.showAlert()
    }
  },

  async created() {
    await this.$store.dispatch(ACTION_FETCH_EMPLOYEES_GROUPS)
  }
}
</script>

<style scoped lang="scss">
  .wage-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;

    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
  }
</style>