<template>
  <div class="my-2 w-full">
    <label :for="placeholder" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
    <input
      :type="inputType"
      :id="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[6px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String || Number,
    default: "Name",
  },
  inputType: {
    type: String,
    default: "string",
  },
  label: {
    type: String,
  },
  placeholder: {
    type: String,
  },
});
defineEmits(["update:modelValue"]);
</script>
