<script setup>
import { storeToRefs } from "pinia";
import useAdminStore from "@/stores/adminStore";

const adminStore = useAdminStore();

const { user } = storeToRefs(adminStore);
const { handleLogin } = adminStore;
</script>

<template>
  <div class="login-bg">
    <div class="login-block">
      <h2>管理者登入</h2>
      <div class="form-floating mb-3">
        <label for="inputUsername">Email address</label>
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
      <div class="form-floating">
        <label for="inputPassword">Password</label>
        <input
          type="password"
          class="form-control"
          id="inputPassword"
          placeholder="Password"
          required
          v-model="user.password"
        />
      </div>
      <button type="button" class="btn btn-lg btn-primary" @click="handleLogin">登入</button>
    </div>
  </div>
</template>
