<template>
  <div class="settings-page">
    <l-group-tree-display
        v-for="(groups, type) in groupTypes"
        :children-key="type"
        :children-name-key="CHILDREN_NAME_KEY_MAP[type]"
        :groups="groups"
        :header="$t(`settings.${type}Groups`)"
        :mode="type"
        :key="type"
        @create="triggerCreate"
        @edit="triggerEdit"
        @remove="triggerRemove"
    />
    <l-modal
        v-model="modalVisible"
        :title="modalTitle"
    >
      <l-form-label :value="$t('settings.name')" />
      <form-input
          v-model="name"
          autofocus
          @enter="submit"
      />
      <template #footer>
        <long-button
            :text="$t('settings.cancel')"
            secondary
            @click="modalVisible = false"
        />
        <long-button
            :text="$t(`settings.${editMode ? 'edit' : 'add'}`)"
            :disabled="name === ''"
            @click="submit"
        />
      </template>
    </l-modal>
    <l-confirm-remove-modal
        v-if="removedItem !== null"
        :value="confirmModalVisibility"
        @hide="removedItem = null"
        @ok="remove"
    >
      {{ name}}
    </l-confirm-remove-modal>
  </div>
</template>

<script>
import LIconButton from "@/components/button/LIconButton";
import LongButton from "@/components/button/LongButton";
import LText from "@/components/LText";
import FormInput from "@/components/input/FormInput";
import LGroupTreeDisplay from "@/components/LGroupTreeDisplay";

import { mapGetters } from "vuex";
import {
  ACTION_FETCH_EXPENSES_GROUPS,
  ACTION_ADD_EXPENSES_GROUP,
  ACTION_EDIT_EXPENSES_GROUP,
  ACTION_REMOVE_EXPENSES_GROUP,
  ACTION_CREATE_EXPENSE,
  ACTION_EDIT_EXPENSE,
  ACTION_REMOVE_EXPENSE
} from "@/store/modules/expensesGroups";
import {
  ACTION_ADD_EMPLOYEE,
  ACTION_CREATE_EMPLOYEES_GROUP, ACTION_EDIT_EMPLOYEE,
  ACTION_EDIT_EMPLOYEES_GROUP,
  ACTION_FETCH_EMPLOYEES_GROUPS, ACTION_REMOVE_EMPLOYEE, ACTION_REMOVE_EMPLOYEES_GROUP
} from "@/store/modules/employeesGroups";
import LModal from "@/components/LModal";
import LConfirmRemoveModal from "@/components/LConfirmRemoveModal";
import LFormLabel from "@/components/LFormLabel";
import LCollapse from "@/components/LCollapse";

const EDIT = 'edit'
const CREATE = 'add'
const EMPLOYEES_MODE = 'employees'
const EXPENSES_MODE = 'expenses'

const CHILDREN_NAME_KEY_MAP = {
  [EMPLOYEES_MODE]: 'employeeName',
  [EXPENSES_MODE]: 'expenseName'
}

const CREATE_GROUP_ACTION_MAP = {
  [EMPLOYEES_MODE]: ACTION_CREATE_EMPLOYEES_GROUP,
  [EXPENSES_MODE]: ACTION_ADD_EXPENSES_GROUP
}

const CREATE_GROUP_ITEM_ACTION_MAP = {
  [EMPLOYEES_MODE]: ACTION_ADD_EMPLOYEE,
  [EXPENSES_MODE]: ACTION_CREATE_EXPENSE
}

const EDIT_GROUP_ACTION_MAP = {
  [EMPLOYEES_MODE]: ACTION_EDIT_EMPLOYEES_GROUP,
  [EXPENSES_MODE]: ACTION_EDIT_EXPENSES_GROUP
}
const EDIT_GROUP_ITEM_ACTION_MAP = {
  [EMPLOYEES_MODE]: ACTION_EDIT_EMPLOYEE,
  [EXPENSES_MODE]: ACTION_EDIT_EXPENSE
}

const REMOVE_GROUP_ACTION_MAP = {
  [EMPLOYEES_MODE]: ACTION_REMOVE_EMPLOYEES_GROUP,
  [EXPENSES_MODE]: ACTION_REMOVE_EXPENSES_GROUP
}

const REMOVE_GROUP_ITEM_ACTION_MAP = {
  [EMPLOYEES_MODE]: ACTION_REMOVE_EMPLOYEE,
  [EXPENSES_MODE]: ACTION_REMOVE_EXPENSE
}
export default {
  name: "Settings",
  components: {
    LFormLabel,
    LCollapse,
    LConfirmRemoveModal,
    LGroupTreeDisplay,
    LModal,
    FormInput,
    LText,
    LIconButton,
    LongButton
  },

  inject: ['showAlert'],

  data() {
    return {
      editMode: false,
      expenseId: null,
      employeeId: null,
      groupId: null,
      groupItemId: null,
      name: '',
      modalVisible: false,
      mode: null,
      removedItem: null,
      EMPLOYEES_MODE,
      EXPENSES_MODE,
      CHILDREN_NAME_KEY_MAP
    }
  },

  computed: {
    ...mapGetters(['expensesGroups', 'employeesGroups']),

    confirmModalVisibility() {
      return this.removedItem != null
    },

    modalTitle() {
      return this.$t(`settings.${ this.editMode ? EDIT : CREATE }`)
    },

    groupTypes() {
      return _([EXPENSES_MODE, EMPLOYEES_MODE]).map(type => [type, this[`${type}Groups`]]).fromPairs().value()
    }
  },

  watch: {
    modalVisible(value) {
      if (!value) {
        this.name = ''
        this.expenseId = null
        this.groupId = null
        this.editMode = false
        this.mode = null
      }
    }
  },

  methods: {
    triggerCreate({ mode, groupId }) {
      this.modalVisible = true
      this.mode = mode
      this.groupId = groupId
    },

    triggerEdit({ mode, group, item }) {
      this.mode = mode
      this.modalVisible = true
      this.editMode = true
      this.name = item?.expenseName || item?.employeeName ||group.groupName
      this.groupId = group.groupId
      this.groupItemId = item?.expenseId || item?.employeeId
    },

    triggerRemove({ mode, item }) {
      this.mode = mode
      this.removedItem = item
      this.name = item?.employeeName || item?.expenseName || item.groupName
    },

    async create() {
      await this.$store.dispatch(
          this.groupId == null ?
              CREATE_GROUP_ACTION_MAP[this.mode] :
              CREATE_GROUP_ITEM_ACTION_MAP[this.mode], {
            name: this.name,
            groupId: this.groupId
          }
      )
    },

    async edit() {
      await this.$store.dispatch(
          this.groupItemId == null ?
              EDIT_GROUP_ACTION_MAP[this.mode] :
              EDIT_GROUP_ITEM_ACTION_MAP[this.mode], {
            name: this.name,
            groupId: this.groupId,
            groupItemId: this.groupItemId
          }
      )
    },

    async remove() {
      const { expenseId, groupId, employeeId } = this.removedItem
      await this.$store.dispatch(
          expenseId == null && employeeId == null ?
              REMOVE_GROUP_ACTION_MAP[this.mode] :
              REMOVE_GROUP_ITEM_ACTION_MAP[this.mode], { expenseId, groupId, employeeId })
      this.removedItem = null
      this.name = ''
    },

    submit() {
      if (this.editMode) {
        this.edit()
      } else {
        this.create()
      }
      this.showAlert()

      this.modalVisible = false
    }
  },

  async created() {
    await this.$store.dispatch(ACTION_FETCH_EXPENSES_GROUPS)
    await this.$store.dispatch(ACTION_FETCH_EMPLOYEES_GROUPS)
  }
}
</script>

<style scoped lang="scss">
  .settings-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 70px;
    padding: 20px;
  }
</style>