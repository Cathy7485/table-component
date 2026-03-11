<script lang="ts" setup>
import TagCollapse, { type TTagPoint } from "@/components/Table/TagCollapse.vue";

const { values, mapping, replace, bgColor } = defineProps<{
  values: Array<string | number> | TTagPoint[];
  mapping?: Record<string, string>;
  replace?: string;
  bgColor?: Record<string, string> | string;
  type?: string;
}>();

// 取得時間顯示的資料(第一筆資料)
const getFirstScheduleTime = (timeList: string[]) => {
  return timeList[0] ?? "";
};

// 時間收合標籤的資料(扣除第一筆)
const scheduleTimeTooltip = (timeList: string[]) => {
  return timeList.slice(1);
};
</script>

<template>
  <div class="array-cell">
    <div v-if="type === 'schedule_points'" class="d-flex flex-wrap">
      <TagCollapse :items="values as TTagPoint[]" :max="1" />
    </div>

    <template v-else-if="type === 'boot_time' || type === 'stop_time'">
      <div class="label time">
        <div v-if="values.length > 0">
          {{ getFirstScheduleTime(values as string[]) }}
        </div>

        <el-tooltip v-if="values.length > 1" effect="dark" placement="top">
          <template #content>
            <div
              v-for="(item, idx) in scheduleTimeTooltip(values as string[])"
              :key="idx"
              class="label"
            >
              {{ mapping?.[item] ?? replace ?? item }}
            </div>
          </template>

          <el-tag type="info" size="small" effect="plain" style="cursor: pointer">
            +{{ values.length - 1 }}
          </el-tag>
        </el-tooltip>
      </div>
    </template>

    <div
      v-else
      v-for="(item, idx) in values as number[]"
      :key="idx"
      :style="{ backgroundColor: typeof bgColor === 'object' ? bgColor?.[item] : bgColor || '' }"
      :class="['cycle-label', type === 'week' ? 'cycle' : '']"
    >
      {{ mapping?.[item] ?? replace ?? item }}
    </div>
  </div>
</template>
