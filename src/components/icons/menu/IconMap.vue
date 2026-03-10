<template>
  <svg
    :width="`${props.width}rem`"
    :height="`${props.height}rem`"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.1651 31L15.8349 28.0844L10.3398 30.2086C9.98435 30.341 9.65438 30.3026 9.34987 30.0934C9.04535 29.8842 8.8931 29.5899 8.8931 29.2104V12.2307C8.8931 11.9827 8.95326 11.7564 9.07358 11.5518C9.19391 11.3473 9.36884 11.2052 9.59839 11.1256L15.8349 9L24.1651 11.9156L29.6602 9.79137C30.0157 9.65901 30.3456 9.684 30.6501 9.86634C30.9546 10.0487 31.1069 10.3208 31.1069 10.6827V27.8762C31.1069 28.1418 31.0333 28.3723 30.8862 28.5676C30.7399 28.7638 30.5428 28.9017 30.2947 28.9813L24.1651 31ZM23.4709 29.3062V13.0623L16.5291 10.6397V26.8835L23.4709 29.3062ZM24.8593 29.3062L29.7185 27.7054V11.2533L24.8593 13.0637V29.3062ZM10.2815 28.7467L15.1407 26.8835V10.6397L10.2815 12.2946V28.7467Z"
      :fill="isHover ? props.hoverColor : props.color"
    />
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  width: { type: Number, default: 2.5 },
  height: { type: Number, default: 2.5 },
  color: { type: String, default: "var(--theme-primary-60)" },
  hoverColor: { type: String, default: "white" },
  isHover: { type: Boolean, default: false },
});
</script>
