<script lang="ts" setup>
const props = defineProps<{
  row: any;
  btnGroup: Array<{
    name: string;
    iconInfo?: { component: any };
    openDialog?: boolean;
    callback?: (row: any) => void;
  }>;
  dialogCallback?: (row: any, btn: any) => void;
}>();

const { row, btnGroup, dialogCallback } = props;
</script>

<template>
  <div class="actions-buttons">
    <template v-for="btn in btnGroup" :key="btn.name">
      <!-- 開彈窗的按鈕 -->
      <el-button
        v-if="btn.openDialog"
        type="primary"
        size="small"
        @click="dialogCallback?.(row, btn)"
      >
        <component :is="btn.iconInfo?.component" />
        {{ btn.name }}
      </el-button>

      <!-- 普通按鈕 -->
      <el-button v-else link type="primary" size="small" @click="btn.callback && btn.callback(row)">
        <component :is="btn.iconInfo?.component" />
        {{ btn.name }}
      </el-button>
    </template>
  </div>
</template>
