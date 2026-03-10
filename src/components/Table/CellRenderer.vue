<script lang="ts" setup>
import ArrayCell from "./ArrayCell.vue";
import SwitchCell from "./SwitchCell.vue";
import DefaultCell from "./DefaultCell.vue";
import { WEEK_LABEL } from "@/constants/schedule";

const props = defineProps<{
  row: Record<string, any>;
  item: {
    prop: string;
    type?: string;
    mapping?: any;
    replace?: any;
    backgroundColor?: string;
    borderColor?: string;
    label?: string;
  };
  switchCallback?: (args: { row: any; value: boolean }) => void;
}>();

const { row, item, switchCallback } = toRefs(props);

// v-model 用 value
const value = computed<boolean>({
  get: () => {
    // 如果沒有值，預設為 --（避免傳 undefined 給 SwitchCell）
    return (row.value?.[item.value.prop] ?? "- -") as boolean;
  },
  set: (val: boolean) => {
    // 1. 先把 row[item.prop] 直接改成新值，Vue 才會重新 render
    row[item.value.prop] = val;
    // 2. 再呼叫 callback，讓父層去呼叫 API、同步資料庫
    switchCallback.value({ row, value: val });
  },
});

// 針對 week 欄位，做格式化輸出
const formatted = computed<string | number | (string | number)[] | boolean | null>(() => {
  if (item.value.prop !== "week") {
    return value.value;
  }

  if (row.value.schedule_type === "once") {
    return "單次";
  }
  const weekdays = [1, 2, 3, 4, 5];

  const wks: number[] = Array.isArray(row.value.week) ? row.value.week : [];

  if (wks.length === weekdays.length && weekdays.every((d) => wks.includes(d))) {
    return "平日";
  }

  if (wks)
    if (wks.length === 2 && wks.includes(6) && wks.includes(7)) {
      return "假日";
    }
  // 其他 → 依 WEEK_LABEL 映射
  return wks.map((d) => WEEK_LABEL[d]).filter(Boolean);
});
</script>

<template>
  <div class="cell-renderer">
    <!-- 陣列型： ArrayCell -->
    <ArrayCell
      v-if="Array.isArray(formatted)"
      :values="formatted"
      :mapping="item.mapping"
      :replace="item.replace"
      :bgColor="item.backgroundColor"
      :type="item.prop"
    />

    <!-- switch 型： SwitchCell -->
    <SwitchCell v-else-if="item.type === 'switch'" v-model="value" />

    <!-- 布林型： BooleanCell -->
    <DefaultCell
      v-else-if="item.type === 'boolean'"
      :value="formatted ? '是' : '否'"
      :mapping="item.mapping"
      :prop="item.prop"
      :bgColor="item.backgroundColor"
      :borderColor="item.borderColor"
      :label="item.label"
    />

    <!-- 其他： DefaultCell -->
    <DefaultCell
      v-else
      :value="formatted"
      :mapping="item.mapping"
      :prop="item.prop"
      :bgColor="item.backgroundColor"
      :borderColor="item.borderColor"
      :label="item.label"
    />
  </div>
</template>
