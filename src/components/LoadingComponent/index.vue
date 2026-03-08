<script setup lang="ts">
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="loading-wrapper" v-if="isLoading">
    <img src="/images/loading.gif" alt="Loading..." />
  </div>
</template>

<style lang="scss" scoped>
.loading-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 1;

  img {
    width: 4.5rem;
    height: 4.5rem;
    object-fit: contain;
  }
}
</style>
