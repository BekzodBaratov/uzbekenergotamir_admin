<template>
  <span
    v-if="!isTo"
    class="buttonStrokeStyle duration-300 hover:bg-transparent border px-4 rounded-lg flex items-center justify-center cursor-pointer"
  >
    <slot></slot>
  </span>

  <RouterLink
    v-if="isTo"
    :to="to"
    class="buttonStrokeStyle duration-300 hover:bg-transparent border px-4 rounded-lg flex items-center justify-center cursor-pointer"
  >
    <slot></slot>
  </RouterLink>
</template>

<script setup>
const props = defineProps({ to: String, color: String });
const color1 = props.color || "#002E69";
const isTo = props.to ? true : false;
</script>

<style scoped>
.buttonStrokeStyle {
  background-color: transparent;
  border-color: v-bind(color1);
  color: v-bind(color1);
}
.buttonStrokeStyle:hover {
  background-color: v-bind(color1);
  color: #f4f6f9;
}
</style>
