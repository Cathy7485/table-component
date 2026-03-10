<template>
  <svg
    :width="`${props.width}rem`"
    :height="`${props.height}rem`"
    viewBox="0 0 24 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.33333 26.8733H14.6667C14.6667 28.4098 13.4667 29.667 12 29.667C10.5333 29.667 9.33333 28.4098 9.33333 26.8733ZM24 24.0797V25.4765H0V24.0797L2.66667 21.286V12.905C2.66667 8.57489 5.33333 4.80346 9.33333 3.54632V3.12727C9.33333 1.59076 10.5333 0.333618 12 0.333618C13.4667 0.333618 14.6667 1.59076 14.6667 3.12727V3.54632C18.6667 4.80346 21.3333 8.57489 21.3333 12.905V21.286L24 24.0797ZM18.6667 12.905C18.6667 8.99394 15.7333 5.92092 12 5.92092C8.26667 5.92092 5.33333 8.99394 5.33333 12.905V22.6828H18.6667V12.905Z"
      :fill="props.color"
    />
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  color: { type: String, default: "var(--theme-text-color)" },
  width: { type: Number, default: 1 },
  height: { type: Number, default: 1 },
});
</script>
