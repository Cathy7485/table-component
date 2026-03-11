import type { TSchedule } from "@/types/schedule";
import useScheduleStore from "@/stores/scheduleStore";

const scheduleStore = useScheduleStore();
const { addSchedule } = scheduleStore;

const useScheduleDialog = () => {
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
        break;
      case "modify":
        openDialog();
        dialogState.dialogTitle = "編輯";
        break;
      case "delete":
        openDialog();
        dialogState.dialogTitle = "刪除";
        break;
    }
  };

  // 送出表單
  const submitDialog = async (
    formData: Partial<TSchedule>,
    tab: number | null,
    selectPoints: number[],
  ) => {
    if (!formData) return;

    console.log("formData", formData);
    console.log("tab", tab);
    try {
      if (dialogState.type === "create") {
        console.log("新增");
        addSchedule(formData, selectPoints);
      } else if (dialogState.type === "modify") {
        console.log("編輯");
      }
      closeDialog();
    } catch (err) {
      console.error("表單送出失敗：", err);
    }
  };

  return {
    isDialogVisible,
    dialogState,
    openDialog,
    closeDialog,
    handleCallDialog,
    submitDialog,
  };
};

export default useScheduleDialog;
