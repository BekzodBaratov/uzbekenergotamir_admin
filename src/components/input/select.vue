<template>
  <div>
    <label for="small" class="block mb-2 text-sm font-medium text-gray-900">{{ props.label }}</label>

    <select
      id="small"
      @change="getValue"
      class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
    >
      <option v-for="(item, index) in props.data" :key="index" :value="item.value">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps(["data", "label"]);

const emit = defineEmits(["getVal"]);
const getValue = (e) => emit("getVal", e.target.value);
</script>
