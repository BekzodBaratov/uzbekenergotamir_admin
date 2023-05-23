<template>
  <span
    v-if="!isTo"
    class="buttonFillStyle duration-300 hover:bg-transparent border px-4 rounded-lg flex items-center justify-center cursor-pointer"
  >
    <slot></slot>
  </span>

  <RouterLink
    v-if="isTo"
    :to="to"
    class="buttonFillStyle text-[#F4F6F9] duration-300 hover:bg-transparent border px-4 rounded-lg flex items-center justify-center cursor-pointer"
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
.buttonFillStyle {
  background-color: v-bind(color1);
  border-color: v-bind(color1);
  color: #f4f6f9;
}
.buttonFillStyle:hover {
  background-color: transparent;
  color: v-bind(color1);
}
</style>
