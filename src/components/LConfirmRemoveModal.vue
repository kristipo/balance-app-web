<template>
  <l-modal
      :value="value"
      :title="$t('removeModal.title')"
      :ok-text="$t('removeModal.remove')"
      @ok="$emit('ok')"
      @hide="hide"
  >
    <slot />
  </l-modal>
</template>

<script>
import LModal from "@/components/LModal";

export default {
  name: "LConfirmRemoveModal",

  components: {
    LModal
  },

  emits: ['hide', 'input'],

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    hide() {
      this.$emit('input', false)
      this.$emit('hide')
    }
  }
}
</script>