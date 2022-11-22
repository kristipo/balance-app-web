<template>
  <div
      class="l-modal"
      :class="{ show }"
  >
    <b-modal
        :visible="show || modalVisibility"
        id="modal-scoped"
        :title="title"
        @hidden="hideModal"
    >
      <slot />
      <template #modal-footer="{ ok, cancel, hide }">
        <slot name="footer">
          <long-button
              :text="cancelText != null ? cancelText : $t('cancel')"
              secondary
              @click="hideModal"
          />
          <long-button
              :text="okText"
              :disabled="okDisabled"
              @click="submit"
          />
        </slot>
      </template>
    </b-modal>
  </div>
</template>

<script>
import LongButton from "@/components/button/LongButton";

export default {
  name: "LModal",

  props: {
    cancelText: {
      type: String,
      default: null
    },

    okDisabled: {
      type: Boolean,
      default: false
    },

    okText: {
      type: String,
      default: null
    },

    show: {
      type: Boolean,
      default: null
    },

    title: {
      type: String,
      default: null
    },

    value: {
      type: Boolean,
      default: null
    }
  },

  components: { LongButton },

  computed: {
    modalVisibility() {
      return this.value != null && this.value
    }
  },

  methods: {
    hideModal() {
      this.$emit('hide')
      this.$emit('input', false)
    },

    submit() {
      this.$emit('ok')
      this.hideModal()
    }
  }
}
</script>

<style scoped lang="scss">
.l-modal {
  display: none;

  &.show {
    display: flex !important;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
}
</style>