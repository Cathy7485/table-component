<script lang="ts" setup>
import zhTw from "element-plus/es/locale/lang/zh-tw";

// 定義 props 和默認值
const props = withDefaults(
  defineProps<{
    id: string;
    time: string | null;
    placeholder?: string;
    hasDeleteBtn?: boolean;
  }>(),
  { time: null, placeholder: "選擇時間", hasDeleteBtn: false },
);

// 定義 emits
const emit = defineEmits<{
  (event: "time", newTime: string | null): void;
  (event: "delete", id: string): void;
}>();

// 傳遞給父元件，要刪除的ID
const handleDelete = (id) => {
  emit("delete", id);
};

// 本地時間的響應式，支持字符串或 null
const localTime = ref<string | null>(props.time);

// 監聽 props.time 的變化並同步到 localTime
watch(
  () => props.time,
  (newTime) => {
    if (newTime !== localTime.value) {
      localTime.value = newTime;
    }
  },
);

const handleTimeChange = (val: string | null) => {
  emit("time", val);
};

onMounted(() => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // 匹配 HH:mm:ss 格式
  if (typeof props.time === "string" && timeRegex.test(props.time)) {
    localTime.value = props.time;
  } else {
    localTime.value = null;
  }
});
</script>

<template>
  <div class="date-picker-block">
    <el-config-provider :locale="zhTw">
      <el-time-picker
        v-model="localTime"
        :id="props.id"
        class="w-100"
        :placeholder="placeholder"
        :format="'HH:mm:ss'"
        :value-format="'HH:mm:ss'"
        @change="handleTimeChange"
      />
    </el-config-provider>
    <div class="delete-input-btn" v-if="hasDeleteBtn" @click="handleDelete(localTime)">
      <IconDelete />
    </div>
  </div>
</template>
