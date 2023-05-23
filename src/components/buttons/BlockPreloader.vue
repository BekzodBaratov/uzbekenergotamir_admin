<template>
  <transition :key="loading" name="skeleton" mode="out-in">
    <div
        v-if="loading"
        key="loading"
        class="shrink-0"
        :style="{
        height: height,
        width: width,
        margin: margin,
        borderRadius: borderRadius,
        style,
      }"
        :class="['dark', preloaderClass]"
    >
      <span
          class="skeleton"
          :style="[shimmerStyles, { borderRadius: borderRadius }]"
          :class="shimmerClass"
      />
    </div>
    <template v-else>
      <slot />
    </template>
  </transition>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  loading?: boolean;
  height?: string;
  width?: string;
  margin?: string;
  line?: string | number;
  borderRadius?: string;
  preloaderClass?: string;
  circle?: boolean;
  style?: string;
  shimmerClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  line: 1,
  borderRadius: "4px",
});

const shimmerStyles = computed(() => {
  return {
    "--width": props.width,
    "--height": props.height,
    "--border-radius": props.circle ? "50%" : props.borderRadius,
  };
});
</script>

<style scoped>
.skeleton {
  background-color: #dddbdd;
  background-image: linear-gradient(
      to right,
      rgba(194, 198, 204, 0.3) 5.93%,
      rgba(255, 255, 255, 0.42) 26.56%,
      rgba(194, 198, 204, 0.3) 62.69%
  );
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  background-repeat: no-repeat;
  background-size: var(--width) var(--height);
  display: inline-block;
  position: relative;
  animation-duration: 10s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeholderShimmer;
  animation-timing-function: linear;
}

.dark .skeleton {
  background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.02) -1.49%,
      rgba(255, 255, 255, 0.25) 14.75%,
      rgba(255, 255, 255, 0.03) 102.98%
  );
}

@keyframes placeholderShimmer {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}

.skeleton-enter-active,
.skeleton-leave-active {
  transition: all 3s ease;
}

.skeleton-enter,
.skeleton-leave-to {
  opacity: 0;
}
</style>
