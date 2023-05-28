<template>
  <div class="mb-6">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">{{ placeholder }}</label>
    <textarea
      id="password"
      v-model="inputVal"
      placeholder="Message"
      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[6px] resize-none h-[200px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
    </textarea>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String || Number,
    required: true,
  },

  placeholder: {
    type: String,
  },
});

const emit = defineEmits(["on-change", "update:modelValue"]);

const inputVal = ref(props.modelValue);

watch(
  () => inputVal.value,
  (val) => {
    emit("update:modelValue", val);
  }
);
</script>
