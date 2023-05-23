<template>
  <div
    id="popup-modal"
    :class="{ 'modal-class': isOpen }"
    class="fixed top-0 hidden items-center justify-center z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full h-[100vh]"
  >
    <div class="relative w-full h-full max-w-md md:h-auto mx-auto">
      <div class="relative bg-white rounded-lg shadow">
        <div class="p-6 text-center">
          <svg
            aria-hidden="true"
            class="mx-auto mb-4 text-gray-400 w-14 h-14"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500">Haqiqatdan ham bu mahsulotni o'chirmoqchimisiz?</h3>
          <div class="flex justify-center gap-2">
            <SButton @click="deleteModal" variant="danger">Ha, Men roziman</SButton>
            <SButton @click="$emit('closeModal', false)" variant="info_me">Yoq, Bekor qilish</SButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SButton from "../buttons/SButton.vue";
const props = defineProps({
  isOpen: Boolean,
  loading: Boolean,
  value: String,
});

const emit = defineEmits(["closeModal", "delete"]);

function deleteModal() {
  emit("delete", true);
  emit("closeModal", false);
}
</script>

<style scoped>
.modal-class {
  overflow: visible;
  display: flex;
  backdrop-filter: blur(6px);
}
</style>
