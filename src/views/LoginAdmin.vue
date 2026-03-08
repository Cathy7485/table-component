<script setup>
import { storeToRefs } from "pinia";
import useAdminStore from "@/stores/adminStore";

const adminStore = useAdminStore();

const { user } = storeToRefs(adminStore);
const { handleLogin } = adminStore;

const animate = ref(false);

onMounted(() => {
  // 動畫
  setTimeout(() => (animate.value = true), 50);
});
</script>

<template>
  <div class="login-wrapper" :class="{ animate }">
    <div class="login-left">
      <h1>表格管理系統</h1>
    </div>
    <div class="login-right">
      <div class="login-form form-block">
        <h2>管理者登入</h2>
        <div class="input-block">
          <label for="inputUsername">信箱</label>
          <input
            type="email"
            class="form-control"
            id="inputUsername"
            placeholder="name@example.com"
            required
            autofocus
            v-model="user.email"
          />
        </div>
        <div class="input-block">
          <label for="inputPassword">密碼</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            placeholder="Password"
            required
            v-model="user.password"
          />
        </div>
        <button type="button" class="button primary-button" @click="handleLogin">登入</button>
      </div>
    </div>
  </div>
</template>
