<template>
  <svg
    :width="`${props.width}rem`"
    :height="`${props.height}rem`"
    viewBox="0 0 34 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M31.304 15.8168C31.188 12.8698 30.2149 10.0207 28.5038 7.61855C26.7927 5.21641 24.418 3.36562 21.6707 2.29299C18.9234 1.22035 15.9229 0.972484 13.0368 1.57975C10.1507 2.18701 7.50452 3.62303 5.42243 5.71182C3.34034 7.80062 1.91283 10.4514 1.31485 13.3394C0.716864 16.2274 0.97438 19.2272 2.05584 21.971C3.13729 24.7148 4.99571 27.0836 7.40334 28.7869C9.81097 30.4903 12.6632 31.4543 15.6106 31.5608M16.1579 7.992V16.413L17.8421 18.0972M29.9684 30.2235L33 33.2551M21.2106 26.5183C21.2106 27.8583 21.7429 29.1435 22.6904 30.091C23.638 31.0386 24.9231 31.5709 26.2632 31.5709C27.6032 31.5709 28.8884 31.0386 29.8359 30.091C30.7835 29.1435 31.3158 27.8583 31.3158 26.5183C31.3158 25.1782 30.7835 23.8931 29.8359 22.9455C28.8884 21.998 27.6032 21.4657 26.2632 21.4657C24.9231 21.4657 23.638 21.998 22.6904 22.9455C21.7429 23.8931 21.2106 25.1782 21.2106 26.5183Z"
      :stroke="isHover ? props.hoverColor : props.color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
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
