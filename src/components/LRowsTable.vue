<template>
  <div class="l-rows-table">
    <div
        v-for="(rows, group) in items"
        class="group-layout"
    >
      <l-text
          :text="group"
          red
          :bold="groupBold"
      />
      <div
          v-for="row in rows"
          class="row-content"
          @click="$emit('click', row)"
      >
        <div class="value-block">
          <l-text :text="row.title" />
          <div class="value">
            <l-text :text="row.value" number-type />
            <div class="controls" @click.stop>
              <l-icon-button
                  v-if="!withinRemove"
                  medium
                  icon="remove"
                  @click="$emit('remove', row)"
              />
            </div>
          </div>
        </div>
        <l-text
            v-if="row.comment != null"
            :text="row.comment"
            grey
            sm
            class="description"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LIconButton from "@/components/button/LIconButton";
import LText from "@/components/LText";
export default {
  name: "LRowsTable",

  components: {
    LIconButton,
    LText
  },

  props: {
    groupBold: {
      type: Boolean,
      default: false
    },

    items: {
      type: [Array, Object],
      required: true
    },

    withinRemove: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click', 'remove']
}
</script>

<style scoped lang="scss">
  .l-rows-table {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 10px;

    .group-layout {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .row-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding-left: 15px;
      cursor: pointer;

      .description {
        position: relative;
        top: -5px;
      }

      .value-block {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .value {
          display: flex;
          align-items: center;
        }

        .controls {
          margin-left: 15px;
        }
      }
    }
  }
</style>