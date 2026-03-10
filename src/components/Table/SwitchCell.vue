<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: boolean): void;
  (e: "change", val: boolean): void;
}>();

// 中介 computed，處理 v-model 雙向綁定
const model = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emit("update:modelValue", val);
    emit("change", val);
  },
});
</script>

<template>
  <el-switch v-model="model" :disabled="disabled" />
</template>
