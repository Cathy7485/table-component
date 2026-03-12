<script lang="ts" setup>
import { STATUS_CLASS_MAP } from "@/constants/schedule";
const props = defineProps<{
  value: string | number | null | boolean;
  mapping?: Record<string, string>;
  bgColor?: Record<string, string> | string;
  borderColor?: Record<string, string> | string;
  textColor?: Record<string, string>;
}>();

// 計算要顯示的文字
const displayText = computed(() => {
  if (props.value === null || props.value === undefined) return "- -";
  const key = String(props.value);
  // 優先看 mapping 表，沒有就顯示原值
  return props.mapping?.[key] ?? key;
});

// 動態 style
const cellStyle = computed(() => {
  const key = props.value != null ? String(props.value) : "";
  return {
    backgroundColor:
      typeof props.bgColor === "object" ? (props.bgColor?.[key] ?? "") : (props.bgColor ?? ""),
    borderColor:
      typeof props.borderColor === "object"
        ? (props.borderColor?.[key] ?? "")
        : (props.borderColor ?? ""),
    color: typeof props.textColor === "object" ? (props.textColor?.[key] ?? "") : "",
  };
});

// 動態 class
const cellClass = computed(() => {
  const classes: string[] = [];

  // 使用映射表管理樣式
  const mappingClass = STATUS_CLASS_MAP[displayText.value];

  if (mappingClass) {
    classes.push(mappingClass);
  }

  // 若 style 有背景顏色，加上 label-class
  if (
    cellStyle.value &&
    typeof cellStyle.value.backgroundColor === "string" &&
    cellStyle.value.backgroundColor.trim() !== ""
  ) {
    classes.push("label-class");
  }

  if (typeof props.value === "boolean") {
    classes.push("alert-state");
  }

  return classes;
});
</script>

<template>
  <div class="default-cell" :title="displayText">
    <span class="label" :class="cellClass" :style="cellStyle">
      {{ displayText }}
    </span>
  </div>
</template>
