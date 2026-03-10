<template>
  <svg
    :width="`${props.width}rem`"
    :height="`${props.height}rem`"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.1429 4.85714H4.42857L5.85714 22H17.2857L18.7143 4.85714H3M11.5714 9.14286V17.7143M15.1429 9.14286L14.4286 17.7143M8 9.14286L8.71429 17.7143M8.71429 4.85714L9.42857 2H13.7143L14.4286 4.85714"
      :stroke="props.color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  color: { type: String, default: "rgba(216, 62, 62, 1)" },
  width: { type: Number, default: 1.5 },
  height: { type: Number, default: 1.5 },
});
</script>
