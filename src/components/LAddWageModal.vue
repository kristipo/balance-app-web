<template>
  <l-modal
      :value="value"
      :ok-text="$t(editMode ? 'edit' : 'add')"
      :title="modalTitle"
      @hide="$emit('hide')"
      @ok="$emit('submit', employeeSalary)"
  >
    <b-form-select
        :value="employeeId"
        :options="employeesByGroups"
        value-field="value"
        label-field="label"
        text-field="label"
        size="sm"
        @input="select"
    />
    <div v-if="employeeId != null" class="l-add-wage-modal-content">
      <form-input
          ref="input"
          v-model="bonusPart"
          :label="$t('wage.bonusPart')"
          type="number"
          inputmode="numeric"
      />
      <form-input
          v-model="fixedPart"
          :label="$t('wage.fixedPart')"
          type="number"
          inputmode="numeric"
      />
    </div>
  </l-modal>
</template>

<script>
import FormInput from "@/components/input/FormInput";
import LFormLabel from "@/components/LFormLabel";
import LModal from "@/components/LModal";
export default {
  name: "LAddWageModal",

  components: {
    FormInput,
    LFormLabel,
    LModal
  },

  props: {
    salary: {
      type: Object,
      default: null
    },

    items: {
      type: Array,
      default: () => []
    },

    value: {
      type: Boolean,
      required: true
    }
  },

  emits: ['ok', 'hide'],

  data() {
    return {
      bonusPart: '',
      fixedPart: '',
      employeeId: null
    }
  },

  computed: {
    editMode() {
      return this.salary !== null
    },

    employeesByGroups() {
      return [
          { value: null, label: this.$t('wage.salaryPlaceholder'), disabled: true },
          ...this.items?.map(group => ({
          label: group.groupName,
          options: group.items.map(item => ({ value: item.employeeId, label: item.employeeName }))
        }))
      ]
    },

    employees() {
      return _(this.items)
          .flatMap(group => group.items.map(item =>[item.employeeId, item]))
          .fromPairs()
          .value()
    },

    employeeSalary() {
      return {
        employeeId: this.employeeId,
        bonusPart: this.bonusPart,
        fixedPart: this.fixedPart
      }
    },

    modalTitle() {
      return this.$t(`wage.${ this.editMode ? 'edit' : 'add' }ModalTitle`)
    }
  },

  watch: {
    employeeId: {
      async handler(value) {
        if (value !== null) {
          await this.$nextTick()
          this.$refs.input.focus()
        }
      },

      immediate: true
    },

    salary: {
      handler(value) {
        if (value !== null) {
          this.employeeId = value?.employeeId
          this.bonusPart = value?.bonusPart
          this.fixedPart = value?.fixedPart
        }
      },

      immediate: true
    },

    value(value) {
      if (!value) {
        this.employeeId = null
        this.bonusPart = ''
        this.fixedPart = ''
      }
    }
  },

  methods: {
    select(id) {
      if (id == null) return
      this.employeeId = id
      const { fixedPart, bonusPart } = this.employees[id]
      this.fixedPart = fixedPart
      this.bonusPart = bonusPart
    }
  }
}
</script>

<style scoped lang="scss">
  .l-add-wage-modal-content {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
</style>