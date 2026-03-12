<script setup lang="ts">
import useAdminStore from "@/stores/adminStore";
import { ElMessageBox } from "element-plus";

const adminStore = useAdminStore();

const handleLogout = () => {
  ElMessageBox.confirm("確定要登出系統嗎？", "提示", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    adminStore.logout();
  });
};
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <h1>排程管理系統</h1>
      <el-button type="button" class="button outline-button white-button" @click="handleLogout">
        登出
      </el-button>
    </div>
  </nav>
</template>
