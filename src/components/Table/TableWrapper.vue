<script lang="ts" setup>
import CellRenderer from "./CellRenderer.vue";
import ActionButtons from "./ActionButtons.vue";

// 定義 Props，新增 emptyState 相關
const props = withDefaults(
  defineProps<{
    rowHeadItems: any[];
    rowDataItems: any[];
    /**
     * 動態設定哪個欄位當唯一 key
     * - 字串：row[rowKey]
     * - 函式：rowKey(row)
     */
    rowKey?: string | ((row: any) => string | number);
    searchKey?: string;
    edit?: { label: string; btnGroup: any[]; minWidth?: string };
    switch?: { callback: (args: any) => void };
    emptyImageSrc?: string;
    emptyImageAlt?: string;
  }>(),
  {
    rowKey: "id", // 預設唯一 key 欄位
    emptyImageSrc: "/images/empty.png",
    emptyImageAlt: "尚無資料",
  },
);

// 解構 Props，加上 toRefs 才具備響應式特性
const {
  rowHeadItems,
  rowDataItems,
  searchKey,
  rowKey,
  edit,
  switch: switchConfig,
  emptyImageSrc,
  emptyImageAlt,
} = toRefs(props);

// Dialog 狀態與資料
const isDialogVisible = ref(false);
const currentRow = ref<any>(null);

// 搜尋表格內容
const filterTableData = computed(() => {
  if (!searchKey.value?.trim()) {
    return rowDataItems.value;
  }

  const keyWord = searchKey.value.trim().toLowerCase();

  return rowDataItems.value.filter((row) =>
    // 對所有欄位值做模糊比對
    Object.values(row).some((val) => String(val).toLowerCase().includes(keyWord)),
  );
});

const isShowTable = computed(() => rowDataItems.value?.length > 0);

const tableRef = ref();
const hiddenColumn = ref(false);
const windowWidth = ref(window.innerWidth);

// 計算每列唯一 key
const computeRowKey = (row: any) => {
  if (typeof rowKey.value === "function") {
    return rowKey.value(row);
  } else {
    return row[rowKey.value as string];
  }
};

const openEditDialog = (row: any) => {
  currentRow.value = row;
  isDialogVisible.value = true;
};

// 彈窗內提交
const onDialogSubmit = (updatedData: any) => {
  isDialogVisible.value = false;
};

// 視窗寬度變化
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

// 隱藏編輯按鈕的欄位
watch(windowWidth, (newWidth) => {
  if (newWidth < 992) {
    hiddenColumn.value = true;
  } else {
    hiddenColumn.value = false;
  }

  nextTick(() => {
    tableRef.value?.doLayout();
  });
});

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <el-table ref="tableRef" :data="filterTableData" v-if="isShowTable" :row-key="computeRowKey">
    {{ filterTableData }}
    <el-table-column
      v-for="item in rowHeadItems"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      :min-width="item.minWidth"
    >
      <template #default="{ row }">
        <CellRenderer :row="row" :item="item" :switchCallback="switchConfig?.callback" />
      </template>
    </el-table-column>

    <!-- 編輯按鈕欄位 -->
    <el-table-column
      v-if="edit && !hiddenColumn"
      :label="edit.label"
      :min-width="edit.minWidth || '110'"
      class-name="is-action-column"
    >
      <template #default="{ row }">
        <ActionButtons :row="row" :btnGroup="edit.btnGroup" @edit="openEditDialog" />
      </template>
    </el-table-column>
  </el-table>

  <!-- 無資料顯示 -->
  <div v-else class="select-img-block text-white">
    <img :src="emptyImageSrc" :alt="emptyImageAlt" class="state-img-block" />
  </div>
</template>

<style scoped lang="scss">
.el-table {
  //element-plus變數
  --el-bg-color-overlay: transparent;

  // table
  --el-table-border: #b3b3b3;
  --el-table-border-color: #b3b3b3;
  --el-fill-color-blank: transparent;
  --el-table-tr-bg-color: transparent;
}
</style>
