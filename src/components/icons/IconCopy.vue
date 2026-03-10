<template>
  <svg
    :width="`${props.width}rem`"
    :height="`${props.height}rem`"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="path-1-inside-1_1252_23869" fill="white">
      <rect x="5.57178" y="4.5" width="15.4286" height="17.5" rx="1" />
    </mask>
    <rect
      x="5.57178"
      y="4.5"
      width="15.4286"
      height="17.5"
      rx="1"
      :stroke="props.color"
      stroke-width="3"
      mask="url(#path-1-inside-1_1252_23869)"
    />
    <path
      d="M17.1429 5.125V2.5C17.1429 2.22386 16.919 2 16.6429 2H3.5C3.22386 2 3 2.22386 3 2.5V17.75C3 18.0261 3.22386 18.25 3.5 18.25H6.21429"
      :stroke="props.color"
      stroke-width="1.5"
    />
    <path
      d="M9.42822 9.75C9.42822 9.33579 9.76401 9 10.1782 9H16.3925C16.8067 9 17.1425 9.33579 17.1425 9.75C17.1425 10.1642 16.8067 10.5 16.3925 10.5H10.1782C9.76401 10.5 9.42822 10.1642 9.42822 9.75Z"
      :fill="props.color"
    />
    <path
      d="M9.42822 13.2119C9.42822 12.7977 9.76401 12.4619 10.1782 12.4619H16.3925C16.8067 12.4619 17.1425 12.7977 17.1425 13.2119C17.1425 13.6262 16.8067 13.9619 16.3925 13.9619H10.1782C9.76401 13.9619 9.42822 13.6262 9.42822 13.2119Z"
      :fill="props.color"
    />
    <path
      d="M9.42822 16.75C9.42822 16.3358 9.76401 16 10.1782 16H12.5354C12.9496 16 13.2854 16.3358 13.2854 16.75C13.2854 17.1642 12.9496 17.5 12.5354 17.5H10.1782C9.76401 17.5 9.42822 17.1642 9.42822 16.75Z"
      :fill="props.color"
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
