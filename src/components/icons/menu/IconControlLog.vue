<template>
  <svg
    :width="`${props.width}rem`"
    :height="`${props.height}rem`"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.5067 24.5067C27.8253 21.1881 27.8253 15.8075 24.5067 12.4889C21.1881 9.17035 15.8076 9.17035 12.489 12.4889C9.17035 15.8075 9.17035 21.1881 12.489 24.5067C15.8076 27.8252 21.1881 27.8252 24.5067 24.5067ZM24.5067 24.5067L30 30"
      :stroke="isHover ? props.hoverColor : props.color"
      stroke-width="1.5"
      stroke-linecap="round"
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
