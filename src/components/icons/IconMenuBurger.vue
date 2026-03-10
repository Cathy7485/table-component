<template>
  <svg
    :width="`${props.width}rem`"
    :height="`${props.height}rem`"
    viewBox="0 0 22 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0H22V2.71429H0V0Z" :fill="props.color" />
    <path d="M0 8.14286H22V10.8571H0V8.14286Z" :fill="props.color" />
    <path d="M0 16.2857H22V19H0V16.2857Z" :fill="props.color" />
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  color: { type: String, default: "var(--theme-primary-60)" },
  width: { type: Number, default: 1.375 },
  height: { type: Number, default: 1.1875 },
});
</script>
