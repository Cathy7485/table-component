<script setup lang="ts">
import LoadingComponent from "@/components/LoadingComponent/index.vue";
import useLoadingStore from "@/stores/loadingStore";

import TableWrapper from "@/components/Table/TableWrapper.vue";
import useScheduleStore from "@/stores/scheduleStore";
import useScheduleDialog from "@/composables/scheduleDialog.ts";

import IconEdit from "@/components/icons/IconEdit.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import ScheduleDialog from "@/components/Dialog/ScheduleDialog.vue";
import { SCHEDULE_RULES, SCHEDULES_TABLE_HEAD } from "@/constants/schedule";

const scheduleStore = useScheduleStore();
const { schedules, pointsList } = storeToRefs(scheduleStore);
const { fetchSchedules, fetchPointOptions } = scheduleStore;

const loadingStore = useLoadingStore();
const { isLoading } = storeToRefs(loadingStore);

onMounted(async () => {
  await fetchSchedules();
  await fetchPointOptions();
});

// --------------------------

const scheduleModal = useScheduleDialog();
const { handleCallDialog, closeDialog, submitDialog } = scheduleModal;
const { isDialogVisible, dialogState } = toRefs(scheduleModal);

// table搜尋
const searchKey = ref("");

// 表格操作按鈕群組
const editGroup = computed(() => {
  const btnGroup: any[] = [];
  btnGroup.push({
    iconInfo: { component: IconEdit },
    callback: (data: any) => {
      handleCallDialog("modify", data);
    },
  });
  btnGroup.push({
    iconInfo: { component: IconDelete },
    callback: (data: any) => {
      handleCallDialog("delete", data);
    },
  });

  return {
    label: "狀態編輯",
    btnGroup,
  };
});

// 列表switch 開關
const handleSwitchChange = async ({ row, value }: { row: any; value: boolean }) => {
  // 原本狀態
  const oldState = !value;

  try {
    // const { schedule_num, schedule_type } = row.value;
    // await handleUpdateScheduleState({
    //   schedule_state: value,
    //   schedule_num,
    //   schedule_type,
    // });
    // row.schedule_state = value;
  } catch (err) {
    row.schedule_state = oldState;
    console.warn("切換狀態失敗或取消", err);
  }
};
</script>

<template>
  <LoadingComponent v-if="isLoading" :isLoading="isLoading" />

  <div class="container layout" v-else>
    <h2>排程管理系統</h2>

    <div class="actions-bar">
      <el-input v-model="searchKey" placeholder="搜尋排程名稱" clearable style="width: 200px" />
      <el-button
        type="primary"
        class="button primary-button"
        @click="handleCallDialog('create', null)"
        >新增排程</el-button
      >
    </div>

    <TableWrapper
      :rowHeadItems="SCHEDULES_TABLE_HEAD"
      :rowDataItems="schedules"
      :searchKey="searchKey"
      :edit="editGroup"
      :switch="{ callback: handleSwitchChange }"
      :rowKey="'id'"
    />

    <ScheduleDialog
      :dialogVisible="isDialogVisible"
      :dialogTitle="dialogState.dialogTitle"
      :defaultFormData="dialogState.formData"
      :dialogType="dialogState.type"
      :dialogPoints="pointsList"
      :dialogRules="SCHEDULE_RULES"
      @close="closeDialog"
      @submit="submitDialog"
    />
  </div>
</template>

<style lang="scss" scoped></style>
