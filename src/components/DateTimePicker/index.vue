<script lang="ts" setup>
import { ElConfigProvider } from "element-plus";
import zhTw from "element-plus/es/locale/lang/zh-tw";

import IconDelete from "@/components/icons/IconDelete.vue";

const props = withDefaults(
  defineProps<{
    id: string;
    time?: string | null;
    hasDeleteBtn?: boolean;
  }>(),
  { hasDeleteBtn: false },
);

const emit = defineEmits<{
  (event: "time", newTime: string | null): void;
  (event: "delete", id: string): void;
}>();

const localTime = ref<string | null>(props.time);

// 傳遞給父元件，要刪除的ID
const handleDelete = (id) => {
  emit("delete", id);
};

const handleTimeChange = (value: any) => {
  localTime.value = value; // 確保本地值同步
  emit("time", value);
};

watch(
  () => props.time,
  (newTime) => {
    localTime.value = newTime;
  },
);
</script>

<template>
  <div class="date-picker-block">
    <el-config-provider :locale="zhTw">
      <el-date-picker
        v-model="localTime"
        type="datetime"
        :id="props.id"
        name="time"
        class="border-1 rounded-1 d-flex w-100"
        placeholder="選擇日期時間"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        @change="handleTimeChange"
      >
      </el-date-picker>
    </el-config-provider>
    <div class="delete-input-btn" v-if="hasDeleteBtn" @click="handleDelete(localTime)">
      <IconDelete />
    </div>
  </div>
</template>
