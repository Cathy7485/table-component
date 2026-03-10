<template>
  <svg
    :width="`${props.width}rem`"
    :height="`${props.height}rem`"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.1943 11.0498H23.8057V9H25.3057V11.0498H29.249C30.2154 11.0498 30.9989 11.8334 30.999 12.7998V29.249C30.999 30.2155 30.2155 30.999 29.249 30.999H10.75C9.7835 30.999 9 30.2155 9 29.249V12.7998C9.00013 11.8334 9.78358 11.0498 10.75 11.0498H14.6943V9H16.1943V11.0498ZM10.5 18.7002V29.249C10.5 29.3871 10.6119 29.499 10.75 29.499H29.249C29.3871 29.499 29.499 29.3871 29.499 29.249V18.7002H10.5ZM10.75 12.5498C10.612 12.5498 10.5001 12.6618 10.5 12.7998V17.2002H29.499V12.7998C29.4989 12.6618 29.387 12.5498 29.249 12.5498H25.3057V14.5996H23.8057V12.5498H16.1943V14.5996H14.6943V12.5498H10.75Z"
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
