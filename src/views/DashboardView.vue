<script setup>
import { onMounted } from "vue";
// import adminHeader from '@/components/AdminHeader.vue';
// import LoadingComponent from '@/components/LoadingComponent.vue';
import axios from "axios";

onMounted(() => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)spaceToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
});
</script>

<template>
  <!-- <adminHeader /> -->
  <div class="container">
    <!-- <LoadingComponent /> -->
    <router-view />
  </div>
</template>
