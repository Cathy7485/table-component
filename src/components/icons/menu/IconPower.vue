<template>
  <svg
    :width="`${props.width}rem`"
    :height="`${props.height}rem`"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.9 22.2L21.6 9V17.8H27.1L19.4 31V22.2H13.9Z"
      :stroke="isHover ? props.hoverColor : props.color"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  color: { type: String, default: "var(--theme-primary-60)" },
  hoverColor: { type: String, default: "white" },
  width: { type: Number, default: 1.5625 },
  height: { type: Number, default: 1.5 },
  isHover: { type: Boolean, default: false },
});
</script>
