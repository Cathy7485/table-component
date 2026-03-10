<template>
  <svg
    :width="`${props.width}rem`"
    :height="`${props.height}rem`"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_164_6383)">
      <path
        d="M14.706 21.1469L21.0623 14.7625L19.4873 13.1875L14.706 17.9687L12.3154 15.5781L10.7123 17.1812L14.706 21.1469ZM6.99976 25C6.38101 25 5.85151 24.7799 5.41126 24.3396C4.97101 23.8994 4.75051 23.3695 4.74976 22.75V9.25C4.74976 8.63125 4.97026 8.10175 5.41126 7.6615C5.85226 7.22125 6.38176 7.00075 6.99976 7H13.7498L15.9998 9.25H24.9998C25.6185 9.25 26.1484 9.4705 26.5894 9.9115C27.0304 10.3525 27.2505 10.882 27.2498 11.5V22.75C27.2498 23.3687 27.0296 23.8986 26.5894 24.3396C26.1491 24.7806 25.6193 25.0007 24.9998 25H6.99976ZM6.99976 22.75H24.9998V11.5H15.0716L12.8216 9.25H6.99976V22.75Z"
        fill="#565656"
      />
    </g>
    <defs>
      <clipPath id="clip0_164_6383">
        <rect width="1.5rem" height="1.5rem" :fill="props.color" transform="translate(3.99976 4)" />
      </clipPath>
    </defs>
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  color: { type: String, default: "var(--theme-text-color)" },
  width: { type: Number, default: 2 },
  height: { type: Number, default: 2 },
});
</script>
