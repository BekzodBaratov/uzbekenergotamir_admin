<template>
  <div
    id="popup-modal"
    :class="{ 'modal-class': isOpen }"
    class="fixed top-0 hidden items-center justify-center z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full h-[100vh]"
  >
    <div class="relative w-full h-full max-w-md md:h-auto mx-auto">
      <div class="relative bg-white rounded-lg shadow">
        <p class="py-2 px-3 font-medium">{{ label }}:</p>
        <div class="px-4 py-2 text-center w-full">
          <form class="border mb-4">
            <textarea type="text" class="w-full h-[80px] outline-none p-2 resize-none" v-model="modalValue"></textarea>
          </form>
          <div class="flex justify-end">
            <SButton variant="danger" class="mr-2" @click="cancelModal">Bekor qilish</SButton>
            <SButton variant="info" @click="fetch" :loading="loading">Saqlash</SButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import SButton from "../buttons/SButton.vue";
import { useToast } from "vue-toastification";
const toast = useToast();
const props = defineProps({
  isOpen: Boolean,
  loading: Boolean,
  value: String,
  label: {
    type: String,
    default: "Categoriya qo`shish",
  },
});

const emit = defineEmits(["closeModal", "fetchModal"]);

const modalValue = ref(props.value);
const openCondition = ref(props.isOpen);

function cancelModal() {
  openCondition.value = false;
  emit("closeModal", openCondition.value);
}

function fetch() {
  openCondition.value = false;
  if (modalValue.value) {
    emit("fetchModal", modalValue.value);
    if (props.loading) {
      cancelModal();
    }
  } else {
    toast.error("Kategoriya maydonini to'ldiring!");
  }
}

watch(
  () => props.loading,
  () => {
    if (!props.loading) {
      cancelModal();
    }
  }
);

watch(
  () => props.value,
  () => {
    modalValue.value = props.value;
  }
);
</script>

<style scoped>
.modal-class {
  overflow: visible;
  display: flex;
  backdrop-filter: blur(6px);
}
</style>
