import type { TSchedule } from "@/types/schedule";
import useScheduleStore from "@/stores/scheduleStore";
import { ElMessage, ElMessageBox } from "element-plus";

const scheduleStore = useScheduleStore();
const { addSchedule, updateSchedule } = scheduleStore;

const useScheduleDialog = () => {
  // 選擇的點位
  const selectPoints = ref<number[]>([]);

  // 彈窗狀態
  const isDialogVisible = ref(false);

  // 彈窗資料與類型
  const dialogState = reactive({
    visible: false,
    type: "" as "create" | "modify" | "delete",
    formData: null as TSchedule | null,
    dialogTitle: "",
  });

  // 開啟彈窗
  const openDialog = () => {
    isDialogVisible.value = true;
  };

  // 關閉彈窗
  const closeDialog = () => {
    isDialogVisible.value = false;
    dialogState.formData = null;
  };

  // 共用彈窗(新增 | 編輯 | 刪除)
  const handleCallDialog = (type: "create" | "modify" | "delete", data: any | null = null) => {
    dialogState.type = type;

    switch (type) {
      case "create":
        openDialog();
        dialogState.dialogTitle = "新增";
        dialogState.formData = data;
        selectPoints.value = [];
        break;
      case "modify":
        if (data) {
          openDialog();
          dialogState.dialogTitle = "編輯";

          dialogState.formData = { ...data };

          if (data.schedule_points) {
            selectPoints.value = data.schedule_points.map((point: any) => point.id);
          } else {
            selectPoints.value = [];
          }
        }
        break;
      case "delete":
        ElMessageBox.confirm(`確定要刪除嗎？此動作不可復原。`, "警告", {
          confirmButtonText: "確定刪除",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            const result = await scheduleStore.deleteSchedule(data.id);

            if (result.success) {
              ElMessage.success("已成功刪除排程");
            } else {
              ElMessage.error("刪除失敗，請稍後再試");
            }
          })
          .catch(() => {
            // 使用者點擊取消，不做任何事
          });
        break;
    }
  };

  // 送出表單
  const submitDialog = async (formData: Partial<TSchedule>, selectPoints: number[]) => {
    if (!formData) return;

    try {
      if (dialogState.type === "create") {
        const result = await addSchedule(formData, selectPoints);
        if (result.success) {
          ElMessage.success("排程新增成功！");
        }
      } else if (dialogState.type === "modify") {
        const id = dialogState.formData?.id as number;
        const result = await updateSchedule(id, formData, selectPoints);
        if (result.success) {
          ElMessage.success("排程修改成功！");
        }
      }
      closeDialog();
    } catch (err) {
      console.error("表單送出失敗：", err);
    }
  };

  return {
    isDialogVisible,
    dialogState,
    selectPoints,
    openDialog,
    closeDialog,
    handleCallDialog,
    submitDialog,
  };
};

export default useScheduleDialog;
