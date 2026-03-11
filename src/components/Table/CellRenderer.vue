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
    mapping?: Record<string, string>;
    replace?: any;
    backgroundColor?: any; // 支援物件或字串
    borderColor?: any;
    label?: string;
  };
  switchCallback?: (args: { row: any; value: boolean }) => void;
}>();

const { row, item, switchCallback } = toRefs(props);

const rawValue = computed(() => row.value?.[item.value.prop]);

// 針對 week 欄位，做格式化輸出
const formatted = computed(() => {
  // 處理 week 邏輯
  if (item.value.prop === "week") {
    if (row.value.schedule_type === "once") return "單次";
    const wks: number[] = Array.isArray(row.value.week) ? row.value.week : [];
    const weekdays = [1, 2, 3, 4, 5];

    if (wks.length === 5 && weekdays.every((d) => wks.includes(d))) return "平日";
    if (wks.length === 2 && wks.includes(6) && wks.includes(7)) return "假日";

    // 返回陣列，並確保沒有 undefined
    return wks.map((d) => WEEK_LABEL[d]).filter((n): n is string => !!n);
  }

  return rawValue.value ?? "- -";
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
    <SwitchCell
      v-else-if="item.type === 'switch'"
      :modelValue="!!rawValue"
      @update:modelValue="(val) => switchCallback?.({ row: row, value: val })"
    />

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
