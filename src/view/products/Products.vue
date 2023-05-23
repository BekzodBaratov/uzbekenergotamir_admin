<template></template>
<!-- <template>
  <div class="flex justify-between items-center mb-4">
    <h3 class="text-gray-700 text-3xl font-medium">Product bo'limi</h3>
    <router-link to="/product_add" class="btn btn-gray cursor-pointer">Yangi product qo'shish</router-link>
  </div>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">table</div>
</template> -->

<!-- <script setup>
import axios from "axios";
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import numberFunction from "../../helpers/formatNumber";
import formatDate from "../../helpers/formatDate";

import DeleteModal from "../../components/modal/DeleteModal.vue";
const openModal = ref(false);

const toast = useToast();
const productsList = ref([]);
const deleteId = ref(null);

const fetchProductsList = () => {
  axios({
    method: "GET",
    url: "/products",
    withCredentials: true,
  }).then((res) => {
    productsList.value = res.data.data.products;
  });
};

function fetchDelete(emit) {
  const isDelete = ref(false);
  isDelete.value = emit;
  if (isDelete.value) {
    const params = {
      headers: {},
      withCredentials: true,
    };
    axios
      .delete(`products/${deleteId.value}`, { params })
      .then((res) => {
        toast.success("Mahsulot muvaffaqiyatli o'chirildi");
        fetchProductsList();
      })
      .catch((res) => {
        toast.error("Xatolik yuz berdi");
      });
  }
}

const productDelete = (id) => {
  openModal.value = true;
  deleteId.value = id;
};

onMounted(() => {
  fetchProductsList();
});
</script> -->

<!-- <style scoped>
.modal-class {
  overflow: visible;
  display: flex;
  backdrop-filter: blur(6px);
}
</style> -->
