<script setup>
import { onMounted } from "vue";

import LoadingComponent from "@/components/LoadingComponent/index.vue";
import useLoadingStore from "@/stores/loadingStore";

const loadingStore = useLoadingStore();
const { isLoading } = storeToRefs(loadingStore);
const { handleLoading } = loadingStore;

onMounted(() => {
  setTimeout(() => {
    handleLoading(false); // 1秒後隱藏loading
  }, 1000);
});
</script>

<template>
  <main class="main">
    <LoadingComponent :isLoading="isLoading" />
    <router-view />
  </main>
</template>
