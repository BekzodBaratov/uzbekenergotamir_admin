<template>
  <div>
    <label for="small" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}:</label>

    <select
      id="small"
      @change="getValue"
      class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
    >
      <option selected :value="model">{{ modelLabel }}</option>
      <option v-for="(item, index) in data" :key="index" :value="item.id">
        {{ !isType ? item.name : item.type }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  data: {
    name: String,
    id: Number,
  },
  model: Number,
  modelLabel: {
    type: String,
    default: "Kategoriyani tanlang",
  },
  label: String,
  isType: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["getVal"]);

function getValue(e) {
  emit("getVal", e.target.value);
}
</script>
