<template>
  <div class="w-full">
    <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
      <div class="p-3 rounded-full bg-indigo-600 bg-opacity-75">
        <img class="h-8 w-8 text-white fill-white" :src="data.icon" alt="user-icon" />
      </div>
      <div class="mx-5">
        <h4 class="text-2xl font-semibold text-gray-700">{{ data.number }}</h4>
        <div class="text-gray-500">{{ data.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["data"]);
const data = computed(() => props.data);
</script>
