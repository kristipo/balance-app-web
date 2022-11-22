<template>
  <div class="l-group-tree-display">
    <div class="groups-layout">
      <div class="group-header">
        <l-text
            :text="header"
            class="header"
        />
        <l-icon-button
            icon="plus-red"
            large
            @click="$emit('create', { mode })"
        />
      </div>
      <div
          v-if="groups.length === 0"
          class="no-data"
      >
        <l-text :text="$t('settings.noGroups.title')" />
      </div>
      <div
          v-for="group in groups"
          :key="group.id"
          class="group-container"
      >
        <l-collapse
            :header="group.groupName"
            init-collapsed
        >
          <template #icons>
            <div class="controls">
              <l-icon-button
                icon="plus-square"
                small
                @click="$emit('create', { mode, groupId: group.groupId})"
              />
              <l-icon-button
                  icon="edit"
                  small
                  @click="$emit('edit', { mode, group })"
              />
              <l-icon-button
                  icon="trash"
                  small
                  @click="$emit('remove', { mode, item: group })"
              />
            </div>
          </template>
          <div
              v-if="group[childrenKey].length !== 0"
              class="group-items-list"
          >
            <div
                v-for="item in group[childrenKey]"
                class="group-item"
            >
              <l-text
                  :text="item[childrenNameKey]"
                  class="item-name"
              />
              <div class="controls">
                <l-icon-button
                    icon="edit"
                    small
                    @click="$emit('edit', { mode, group, item })"
                />
                <l-icon-button
                    icon="trash"
                    small
                    @click="$emit('remove', { mode, item })"
                />
              </div>
            </div>
          </div>
          <l-text
              v-else :text="$t('settings.emptyGroup')"
              class="empty-group"
          />
        </l-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import LCollapse from "@/components/LCollapse";
import LIconButton from "@/components/button/LIconButton";
import LText from "@/components/LText";

export default {
  name: "LGroupTreeDisplay",

  components: {
    LCollapse,
    LIconButton,
    LText
  },

  props: {
    childrenKey: {
      type: String,
      required: true
    },

    childrenNameKey: {
      type: String,
      required: true
    },

    groups: {
      type: Array,
      required: true
    },

    header: {
      type: String,
      required: true
    },

    mode: {
      type: String,
      required: true
    }
  },

  emits: [
    'create',
    'edit',
    'remove'
  ]
}
</script>

<style scoped lang="scss">
  .l-group-tree-display {
    display: flex;
    flex-direction: column;
    width: 100%;

    .groups-layout {
      display: flex;
      flex-direction: column;
      gap: 16px;

      .group-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin-bottom: 20px;
        background: $lulu-pink;
        padding: 8px;

        .header {
          font-size: 24px;
          color: $primary;
        }
      }

      .group-container {
        display: flex;
        flex-direction: column;
        width: 100%;

        .controls {
          display: flex;
          gap: 12px;
          margin-left: 15px;
        }

        .group-items-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 10px 5px 20px;

          .group-item {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            border-left: 1px dashed grey;
            border-bottom: 1px dashed grey;

            .item-name {
              display: flex;
              width: 100%;
              margin-left: 20px;
            }
          }
        }

        .empty-group {
          margin-left: 25px;
        }
      }
    }

    .no-data {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      gap: 10px;
    }
  }
</style>