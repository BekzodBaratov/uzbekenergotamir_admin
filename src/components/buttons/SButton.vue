<template>
  <button
    v-bind="{ disabled, type }"
    class="s-button s-transition rounded-lg flex-center cursor-pointer relative flex items-center justify-center px-3 py-2 md:px-4 md:py-3 whitespace-nowrap"
    :class="[{ 'pointer-events-none': loading }, buttonVariantClass, customClass]"
    aria-label="button"
  >
    <template v-if="loading">
      <i
        :class="[
          's-transition absolute-center-h absolute-center-v',
          loading ? 'opacity-100 block' : 'opacity-0 hidden w-0',
        ]"
      >
        <svg class="circular-loader" viewBox="25 25 50 50">
          <circle class="circular-loader__path" cx="52" cy="52" r="20" fill="none" />
        </svg>
      </i>
    </template>
    <template v-else>
      <slot>
        <span :class="textStyle">
          {{ text }}
        </span>
      </slot>
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  text?: string;
  textClass?: string;
  hasShadow?: boolean;
  spinnerColor?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: string;
  variant: string;
  noLoader?: boolean;
  customClass?: string;
}

// ******* PROPS *******
const props = withDefaults(defineProps<Props>(), {
  hasShadow: true,
  text: "Button",
  type: "button",
  textClass: "",
  spinnerColor: "white",
  disabled: false,
  loading: false,
  variant: undefined,
});

const variants = computed<{ [key in Props["variant"]]: string }>(() => ({
  primary: "s-button-primary",
  info_me: "s-button-info-me",
  primary_dark: "s-button-primary_dark",
  secondary: "s-button-secondary",
  danger: "s-button-danger",
  outline: "s-button-outline",
  fade: "s-button-fade",
  info: "s-button-info",
  info_light: "s-button-info_light",
}));

const buttonVariantClass = computed<string>(() => variants.value[props.variant]);

const textStyle = computed(() => {
  const labelClass = props.textClass;
  return [
    labelClass,
    !props.loading ? "opacity-100 block" : "opacity-0 hidden",
    "s-transition delay-100 font-semibold letter-3 !leading-sm text-sm select-none",
  ];
});
</script>

<style>
.s-button {
  font-family: "Lato", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #fff;
  transition: all 0.3s ease-in-out;
}

.s-button:disabled,
.s-button:disabled:hover {
  background: #f0f5fa !important;
  color: #c2cfe0 !important;
}

.s-button:disabled h1,
.s-button:disabled p {
  color: #66666a;
}

.s-button:not(:disabled):active {
  transform: scale(0.98);
}

.s-button:disabled {
  cursor: not-allowed;
}

.s-button .circular-loader {
  width: 18.09px;
  height: 18px;
  stroke: #f2f5f5;
}

.s-button .circular-loader__path {
  fill: none;
  stroke-width: 5px;
  stroke-linecap: round;
  animation: animate-stroke 1s ease-in-out infinite;
}

@keyframes animate-stroke {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}

/* me */
.s-button-info-me {
  @apply text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10;
}

/* Primary */
.s-button-primary {
  background: #35abb2 !important;
}

.s-button-primary:not(:disabled):hover {
  background: #334d6e !important;
}

/* Secondary */

.s-button-secondary {
  color: #109cf1;
  background: rgba(16, 156, 241, 0.1) !important;
}

.s-button-secondary:not(:disabled):hover {
  background: rgba(16, 156, 241, 0.29) !important;
}

.s-button-primary_dark {
  background: #2f5299 !important;
}

.s-button-primary_dark:not(:disabled):hover {
  background: #109cf1 !important;
}

/* Fade */
.s-button-fade {
  background: rgba(255, 255, 255, 0.12) !important;
}

.s-button-fade:not(:disabled):hover {
  background: rgba(255, 255, 255, 0.2) !important;
}
/*Outline*/
.s-button-outline {
  background: rgba(89, 94, 220, 0.1) !important;
}
.s-button-outline:hover {
  background: #c7cbff !important;
}
/* Info */
.s-button-info {
  background: #35abb2 !important;
}

.s-button-info:not(:disabled):hover {
  background: #2c8e94 !important;
}
.s-button-info_light {
  background: rgba(89, 94, 220, 0.1) !important;
  color: #595edc !important;
}
.s-button-info_light:hover {
  background: rgba(89, 94, 220, 0.2) !important;
  color: #595edc !important;
}

/* Danger */
.s-button-danger {
  color: #fff;
  background: #dc2626 !important;
  @apply text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center;
}

.s-button-danger:not(:disabled):hover {
  background: rgba(177, 48, 48, 0.87) !important;
}
</style>
