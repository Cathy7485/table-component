<script setup lang="ts">
export type TTagPoint = {
  id: number;
  point_name: string;
};

const props = defineProps<{
  items: TTagPoint[] | number[];
  labelMap?: Record<number, string>;
  max?: number;
}>();

const maxShow = props.max ?? 3;

const allTags = computed(() => {
  if (props.items.length > 0 && typeof props.items[0] === "object") {
    return (props.items as TTagPoint[]).map((it) => ({
      value: it.id,
      label: it.point_name,
    }));
  }

  return (props.items as number[]).map((num) => ({
    value: num,
    label: props.labelMap?.[num] ?? String(num),
  }));
});

const visibleItems = computed(() => allTags.value.slice(0, maxShow));
const hiddenItems = computed(() => allTags.value.slice(maxShow));
</script>

<template>
  <div class="tag-collapse">
    <el-tag
      v-if="visibleItems.length > 0"
      v-for="item in visibleItems"
      :key="item.value"
      class="box-item"
    >
      {{ item.label }}
    </el-tag>

    <!-- 折疊的 +N 標籤 -->
    <el-tooltip
      v-if="hiddenItems.length"
      effect="dark"
      placement="right-start"
      class="more-tag"
      style="max-height: 160px !important; overflow: auto !important"
    >
      <template #content>
        <el-tooltip
          v-for="item in hiddenItems"
          :key="item.value"
          class="box-item"
          effect="light"
          placement="right-start"
        >
          <div class="tooltip-item">
            {{ item.label }}
          </div>
        </el-tooltip>
      </template>
      <el-tag size="small" type="warning" class="tag-item"> +{{ hiddenItems.length }} </el-tag>
    </el-tooltip>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/base/grid" as *;

.tag-collapse {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.125rem;
}

:deep(.el-tag) {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: var(--theme-color);
  font-size: 0.875rem;
  padding: 0.5rem;
  border: solid 0.125rem var(--theme-color);
  border-radius: 0.9375rem;
  height: auto;
  transition: none !important;
  animation: none !important;
  cursor: pointer;
}

:deep(.el-tag__content) {
  display: inline-block;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1;

  @include wide-xl {
    max-width: 140px;
  }
}

.more-tag {
  cursor: pointer;
}

.tooltip-item {
  padding: 0.125rem 0;
  white-space: nowrap;
  cursor: pointer;
}
</style>
