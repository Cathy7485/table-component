import { useValidationRules } from "@/composables/useValidationRules";

// 排程列表的table表頭
export const SCHEDULES_TABLE_HEAD = [
  {
    label: "排程名稱",
    prop: "schedule_name",
    minWidth: "120",
  },
  {
    label: "控制項目",
    prop: "schedule_points",
    minWidth: "130",
  },
  {
    label: "開啟時間",
    prop: "boot_time",
    minWidth: "150",
  },
  {
    label: "關閉時間",
    prop: "stop_time",
    minWidth: "150",
  },
  {
    label: "排程敘述",
    prop: "schedule_note",
    minWidth: "150",
  },
  {
    label: "循環週期",
    prop: "week",
    minWidth: "95",
  },
  {
    label: "編輯者",
    prop: "editor",
    minWidth: "80",
  },
  {
    label: "開啟中",
    prop: "schedule_state",
    minWidth: "60",
    type: "switch",
  },
];

// 排程彈窗驗證規則
const { validateNameLength } = useValidationRules();
export const SCHEDULE_RULES = {
  schedule_name: [
    {
      required: true,
      message: "請輸入名稱",
      trigger: "blur",
    },
    {
      validator: validateNameLength,
      trigger: "blur",
    },
  ],
  boot_time: [
    {
      required: true,
      message: "必須選取開始時間",
      trigger: "blur",
    },
  ],
  stop_time: [
    {
      required: true,
      message: "必須選取結束時間",
      trigger: "blur",
    },
  ],
  schedule_type: [
    {
      required: true,
      message: "必須選取循環方式",
      trigger: "blur",
    },
  ],
  week: [
    {
      required: true,
      message: "必須選取循環週期",
      trigger: "blur",
    },
  ],
};

export const WEEK_LABEL: Record<number, string> = {
  1: "週一",
  2: "週二",
  3: "週三",
  4: "週四",
  5: "週五",
  6: "週六",
  7: "週日",
};

// table元件中的標籤狀態CLASS對照表
export const STATUS_CLASS_MAP: Record<string, string> = {
  單次: "once",
  循環: "cycle-default",
  平日: "cycle-weekday",
  假日: "cycle-holiday",
  嚴重: "alert-label critical",
  異常: "alert-label abnormal",
  警戒: "alert-label warning",
  斷線: "alert-label shutdown",
  正常: "alert-label normal",
};
