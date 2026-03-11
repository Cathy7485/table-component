<script lang="ts" setup>
import type { FormInstance, FormItemRule } from "element-plus";

import DateTimePicker from "@/components/DateTimePicker/index.vue";
import TimePicker from "@/components/TimePicker/index.vue";
import type { TPointList, TSchedule } from "@/types/schedule";

const props = defineProps<{
  dialogVisible: boolean;
  dialogTitle: string;
  defaultFormData: any | null;
  dialogRules: Record<string, any>;
  dialogType: string;
  dialogPoints: TPointList[];
}>();

// 解構 Props，加上 toRefs 才具備響應式特性
const { dialogTitle, dialogVisible, dialogType, dialogPoints } = toRefs(props);

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", fromData: Partial<any>, tab: number | null, selectPoints: number[]): void;
}>();

const closeDialog = () => {
  emit("close");
};

const resetForm = () => {
  // 重置表單
  Object.assign(formData, {
    schedule_name: "",
    schedule_note: "",
    boot_time: "",
    stop_time: "",
    week: [],
    schedule_type: "",
    editor: "",
    edit_time: "",
  });

  // 重置變數
  selectPoints.value = [];
  selectedTab.value = 1;

  // 清除紅字警告
  nextTick(() => {
    formRef.value?.clearValidate();
  });
};

// 監聽彈窗顯示狀態
watch(dialogVisible, (isVisible) => {
  if (isVisible) {
    if (dialogType.value === "modify" && props.defaultFormData) {
      // 編輯
      Object.assign(formData, props.defaultFormData);

      if (props.defaultFormData.schedule_points) {
        selectPoints.value = props.defaultFormData.schedule_points.map((point: any) => point.id);
      } else {
        selectPoints.value = [];
      }

      // 根據有無週次判斷 Tab 切換
      selectedTab.value = props.defaultFormData.week?.length > 0 ? 2 : 1;
    } else {
      // 新增清空資料
      resetForm();
    }
  } else {
    // 關閉時清空
    resetForm();
  }
});

// 選擇的控制項目點位
const selectPoints = ref<number[]>([]);

const formData = reactive<TSchedule>({
  schedule_name: "",
  schedule_note: "",
  boot_time: "",
  stop_time: "",
  week: [],
  schedule_type: "",
  editor: "",
  edit_time: "",
});

const formRef = ref<FormInstance>();

// 分類，1.once單次 | 2.cycle循環
const selectedTab = ref(1);

// 星期
import { cycleOptions } from "@/composables/dayOfWeek";
import { SCHEDULE_RULES } from "@/constants/schedule";

// 平日/假日 active
const dayLabel = computed(() => {
  const sortArr = (a: number[], b: number[]) =>
    a.length === b.length &&
    a
      .slice()
      .sort((x, y) => x - y)
      .every((v, i) => v === b.slice().sort((x, y) => x - y)[i]);

  if (sortArr(formData.week as number[], [1, 2, 3, 4, 5])) {
    return "平日";
  }
  if (sortArr(formData.week as number[], [6, 7])) {
    return "假日";
  }
});
// 平日/假日快速按鈕
const selectWeekDays = (days: number[]) => {
  formData.week = days;
};

// -----------------------------------------------

// 接收DateTimePicker/TimePicker元件 - 開始日期
const handleBootTime = (val: string | null) => {
  formData.boot_time = val || "";
};

// 接收DateTimePick/TimePicker元件 - 結束日期
const handleStopTime = (val: string | null) => {
  formData.stop_time = val || "";
};
// --------------------------------------------------
// 開始結束時間欄位驗證
// 取得「今天」的 YYYY-MM-DDT00:00:00 字串
const todayStart = new Date();
todayStart.setHours(0, 0, 0, 0);

const validateBootTime: FormItemRule["validator"] = (_rule: any, value, callback) => {
  if (!value) {
    return callback(new Error("請選擇開始時間"));
  }

  const boot = new Date(value);
  const stop = formData.stop_time ? new Date(formData.stop_time) : null;

  if (boot < todayStart) {
    return callback(new Error("開始時間不可早於今天"));
  }

  if (stop) {
    const bootTime = boot.getTime();
    const stopTime = stop.getTime();

    if (bootTime === stopTime) {
      return callback(new Error("開始時間不可等於結束時間"));
    }

    if (bootTime > stopTime) {
      return callback(new Error("開始時間不可晚於結束時間"));
    }
  }

  callback();
};

const validateStopTime: FormItemRule["validator"] = (_rule: any, value, callback) => {
  if (!value) {
    return callback(new Error("請選擇結束時間"));
  }
  callback();
};

// 合併規則
const mergedRules = computed<Record<string, FormItemRule[]>>(() => {
  // 使用類型斷言確保初始物件符合結構
  const rules = { ...SCHEDULE_RULES } as Record<string, FormItemRule[]>;

  if (!rules.boot_time) rules.boot_time = [];
  if (!rules.stop_time) rules.stop_time = [];

  // 確保推入的物件完全符合 FormItemRule 介面
  rules.boot_time.push({
    validator: validateBootTime, // 這裡的 validateBootTime 必須符合上面提到的參數規範
    trigger: "blur",
  });

  rules.stop_time.push({
    validator: validateStopTime,
    trigger: "blur",
  });

  return rules;
});
// ----------------------------------
// 送出表單
const handleSubmit = () => {
  formRef.value?.validate(async (valid) => {
    if (!valid) return;

    if (dialogType.value === "create" || dialogType.value === "modify") {
      let payload: Partial<any> = {};

      // 1.單次 | 2.循環
      switch (selectedTab.value) {
        case 1:
          payload = {
            schedule_type: "once",
            schedule_name: formData.schedule_name,
            schedule_note: formData.schedule_note,
            boot_time: formData.boot_time,
            stop_time: formData.stop_time,
          };
          break;

        case 2:
          payload = {
            schedule_type: "cycle",
            schedule_name: formData.schedule_name,
            schedule_note: formData.schedule_note,
            boot_time: formData.boot_time,
            stop_time: formData.stop_time,
            week: formData.week,
          };
          break;

        default:
          break;
      }

      // 排序過後的點位
      const sortedPoints = [...selectPoints.value].sort((a, b) => a - b);

      emit("submit", payload, selectedTab.value, sortedPoints);
    }
  });
};
</script>

<template>
  <Teleport to="#teleport-container">
    <transition name="fade">
      <div v-if="dialogVisible" class="dialog-wrapper schedule-dialog">
        <el-form
          class="dialog-block dialog-control"
          ref="formRef"
          :model="formData"
          :rules="mergedRules"
        >
          <div class="dialog-title">
            {{ dialogTitle }}排程
            <div class="close-btn" @click="closeDialog">關閉</div>
          </div>
          <div class="dialog-content">
            <div class="column-block">
              <el-radio-group v-model="selectedTab" class="cycle-type">
                <el-radio :value="1">單次</el-radio>
                <el-radio :value="2">循環</el-radio>
              </el-radio-group>
            </div>

            <div v-if="selectedTab === 2" class="column-layout">
              <div class="column-block">
                <div class="input-column-group">
                  <el-form-item label="星期" prop="week">
                    <div class="input-column-group">
                      <el-checkbox-group v-model="formData.week">
                        <el-checkbox-button
                          v-for="item in cycleOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                          {{ item.label }}
                        </el-checkbox-button>
                      </el-checkbox-group>
                    </div>
                  </el-form-item>
                </div>
              </div>
            </div>

            <div v-if="selectedTab === 2" class="column-layout">
              <div class="column-block days">
                <div
                  :class="[
                    'input-column-group button outline-button',
                    dayLabel === '平日' ? 'active' : '',
                  ]"
                  @click="selectWeekDays([1, 2, 3, 4, 5])"
                >
                  平日
                </div>
                <div
                  :class="[
                    'input-column-group button outline-button',
                    dayLabel === '假日' ? 'active' : '',
                  ]"
                  @click="selectWeekDays([6, 7])"
                >
                  假日
                </div>
              </div>
            </div>

            <div class="column-layout">
              <div class="column-block">
                <div class="input-column-group">
                  <el-form-item label="開啟時間" prop="boot_time">
                    <template v-if="selectedTab === 1">
                      <DateTimePicker
                        v-model:time="formData.boot_time"
                        @time="handleBootTime"
                        id="boot_time"
                      />
                    </template>
                    <template v-else>
                      <TimePicker
                        id="start_time"
                        v-model:time="formData.boot_time"
                        placeholder="請選擇開始時間"
                        @time="handleBootTime"
                      />
                    </template>
                  </el-form-item>
                </div>
                <div class="input-column-group">
                  <el-form-item label="關閉時間" prop="stop_time">
                    <template v-if="selectedTab === 1">
                      <DateTimePicker
                        v-model:time="formData.stop_time"
                        @time="handleStopTime"
                        id="stop_time"
                      />
                    </template>
                    <template v-else>
                      <TimePicker
                        id="stop_time"
                        v-model:time="formData.stop_time"
                        placeholder="請選擇結束時間"
                        @time="handleStopTime"
                      />
                    </template>
                  </el-form-item>
                </div>
              </div>
            </div>

            <div class="column-layout">
              <div class="column-block">
                <div class="input-column-group">
                  <el-form-item label="排程名稱" prop="schedule_name">
                    <el-input v-model="formData.schedule_name" placeholder="輸入名稱" />
                  </el-form-item>
                </div>
                <div class="input-column-group">
                  <el-form-item label="控制項目" prop="point_num_list">
                    <el-select
                      v-model="selectPoints"
                      multiple
                      collapse-tags
                      placeholder="請選擇項目"
                    >
                      <el-option
                        v-for="item in dialogPoints"
                        :key="item.id"
                        :label="item.point_name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </div>

            <div class="column-layout">
              <div class="column-block">
                <div class="input-column-group">
                  <el-form-item label="排程描述" prop="schedule_note">
                    <el-input
                      v-model="formData.schedule_note"
                      :rows="3"
                      type="textarea"
                      placeholder="輸入文字內容"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>

            <div class="column-layout column-footer">
              <button type="button" class="button outline-button" @click="closeDialog">
                <span>取消</span>
              </button>
              <button type="button" class="button primary-button" @click="handleSubmit">
                <span>確認</span>
              </button>
            </div>
          </div>
        </el-form>
      </div>
    </transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.cycle-type {
  width: 70%;
  margin: 0 auto;
  justify-content: space-evenly;
}

.el-checkbox-group {
  display: flex;
  justify-content: space-between;
  align-items: center;

  :deep(.el-checkbox-button__inner) {
    border-radius: 0.5rem;
  }

  &.is-checked {
    .el-checkbox-button__inner {
      background-color: var(--theme-color) !important;
      border-color: transparent;
    }
  }

  &:first-child {
    :deep(.el-checkbox-button__inner) {
      border: none;
    }
  }

  .input-column-group label {
    margin-bottom: 0;
  }
}

.input-column-group {
  :deep(.el-form-item) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}

:deep(.el-form-item__content) {
  width: 100%;
}

:deep(.el-form-item__label) {
  height: auto;
  margin-bottom: 0;
  padding-right: 0;
}

:deep(.el-checkbox-button__inner) {
  background-color: transparent;
  border-color: transparent;
}
</style>
