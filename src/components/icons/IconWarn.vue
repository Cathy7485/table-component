<template>
  <svg
    :width="`${props.width}rem`"
    :height="`${props.height}rem`"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.40753 21.259L11.5619 2.79656C11.7519 2.45117 12.2481 2.45117 12.4381 2.79656L22.5925 21.259C22.7757 21.5923 22.5347 22 22.1544 22H1.84564C1.46533 22 1.22425 21.5923 1.40753 21.259Z"
      :stroke="isHover ? props.hoverColor : props.color"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V10.5C11.25 10.0858 11.5858 9.75 12 9.75C12.4142 9.75 12.75 10.0858 12.75 10.5V15C12.75 15.4142 12.4142 15.75 12 15.75Z"
      :fill="isHover ? props.hoverColor : props.color"
    />
    <path
      d="M12.0303 17.4658C12.1198 17.4665 12.17 17.4914 12.2148 17.5361C12.2592 17.5804 12.2838 17.6296 12.2842 17.7178C12.2845 17.8038 12.2606 17.8518 12.2158 17.8965C12.1706 17.9416 12.1216 17.9658 12.0342 17.9658H12.0303C11.9486 17.9664 11.9012 17.9443 11.8545 17.8975C11.8066 17.8494 11.7839 17.8002 11.7842 17.7178C11.7845 17.6323 11.8085 17.5809 11.8564 17.5322C11.9 17.4881 11.9459 17.4652 12.0303 17.4658Z"
      :fill="isHover ? props.hoverColor : props.color"
      :stroke="isHover ? props.hoverColor : props.color"
    />
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  width: { type: Number, default: 1.5 },
  height: { type: Number, default: 1.5 },
  color: { type: String, default: "var(--theme-text-color)" },
  hoverColor: { type: String, default: "white" },
  isHover: { type: Boolean, default: false },
});
</script>
