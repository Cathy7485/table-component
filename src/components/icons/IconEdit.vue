<template>
  <svg
    :width="`${props.width}rem`"
    :height="`${props.height}rem`"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.6113 3.05273H2V22.0001H21.2226V11.4738"
      :stroke="props.color"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      d="M11.6445 15.1851L8.4082 15.3978L8.62396 12.2079L18.9801 2L22.0007 4.97729L11.6445 15.1851Z"
      :stroke="props.color"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  color: { type: String, default: "var(--theme-primary-60)" },
  width: { type: Number, default: 1.5 },
  height: { type: Number, default: 1.5 },
});
</script>
