<template>
  <svg
    :width="`${props.width}rem`"
    :height="`${props.height}rem`"
    viewBox="0 0 29 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.4444 18H26.8889M26.8889 18L21.5556 23.3333M26.8889 18L21.5556 12.6667M26.8889 7.33333V5.55556C26.8889 4.61256 26.5143 3.70819 25.8475 3.0414C25.1807 2.3746 24.2763 2 23.3333 2H5.55556C4.61256 2 3.70819 2.3746 3.0414 3.0414C2.3746 3.70819 2 4.61256 2 5.55556V30.4444C2 31.3874 2.3746 32.2918 3.0414 32.9586C3.70819 33.6254 4.61256 34 5.55556 34H23.3333C24.2763 34 25.1807 33.6254 25.8475 32.9586C26.5143 32.2918 26.8889 31.3874 26.8889 30.4444V28.6667"
      :stroke="isHover ? props.hoverColor : props.color"
      stroke-width="2.375"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  color: { type: String, default: `var(--theme-text-color)` },
  width: { type: Number, default: 1 },
  height: { type: Number, default: 1.375 },
  hoverColor: { type: String, default: "white" },
  isHover: { type: Boolean, default: false },
});
</script>
