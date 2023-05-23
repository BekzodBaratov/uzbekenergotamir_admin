<template></template>

<!-- <template>
  <div class="flex justify-between items-center mb-4">
    <h3 class="text-gray-700 text-3xl font-medium">Service bo'limi</h3>
    <router-link to="/service_add" class="btn btn-gray cursor-pointer"
      >Yangi service qo'shish</router-link
    >
  </div>
  <div class="">
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table class="min-w-full leading-normal">
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50  "
          >
            <tr>
              <th scope="col" class="p-4">Rasmi</th>
              <th scope="col" class="px-6 py-3">Service</th>
              <th scope="col" class="px-6 py-3">Tel raqam:</th>

              <th scope="col" class="px-6 py-3 text-left">Muommolar</th>
              <th scope="col" class="px-6 py-3 text-left">features</th>

              <th scope="col" class="px-6 py-3">Qisqacha</th>

              <th scope="col" class="px-6 py-3">Qo'shilgan vaqti</th>

              <th scope="col" class="px-6 py-3">Amallar</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b "
              v-for="(item, index) in serviceList"
              :key="index"
            >
              <td class="w-4 p-4">
                <img
                  :src="item.image_url"
                  alt="images"
                  class="w-full h-[40px]"
                />
              </td>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {{ item.name }}
              </th>

              <th
                scope="row"
                class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap "
              >
                {{ item?.phone }}
              </th>

              <th
                scope="row"
                class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap  flex justify-start"
              >
                <ul class="text-left">
                  <li v-for="(el, index) in item.resolve_problems" :key="el">
                    <span class="font-medium">{{ index + 1 }}. &nbsp;</span
                    >{{ el }}
                  </li>
                </ul>
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap  justify-start"
              >
                <ul class="text-left">
                  <li v-for="(el, index) in item.features" :key="el">
                    <span class="font-medium">{{ index + 1 }}. &nbsp;</span
                    >{{ el }}
                  </li>
                </ul>
              </th>

              <th
                scope="row"
                class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap "
              >
                {{ item?.description }}
              </th>

              <td class="px-6 py-4">
                {{ formatDate(item.createdAt) }}
              </td>

              <td class="px-6 py-4">
                <div class="flex gap-4">
                  <router-link
                    :to="`/service/${item.id}`"
                    class="font-medium text-blue-600  hover:underline"
                    ><i
                      class="fa-solid fa-pen-to-square text-[blue] text-[20px]"
                    ></i
                  ></router-link>
                  <div
                    class="font-medium text-red-600  hover:underline cursor-pointer"
                    @click="productDelete(item.id)"
                  >
                    <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
                  </div>
                  <DeleteModal
                    :is-open="openModal"
                    @delete="fetchDelete"
                    @closeModal="openModal = $event"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import numberFunction from "../../helpers/formatNumber";
import formatDate from "../../helpers/formatDate";

import DeleteModal from "../../components/modal/DeleteModal.vue";
const openModal = ref(false);
const deleteId = ref(null);

const toast = useToast();
const serviceList = ref([]);

const fetchProductsList = () => {
  axios({
    method: "GET",
    url: "/services",
    withCredentials: true,
  }).then((res) => {
    serviceList.value = res.data.data.services;
  });
};

function fetchDelete(emit) {
  if (emit) {
    const params = {
      headers: {},
      withCredentials: true,
    };
    axios
      .delete(`services/${deleteId.value}`, { params })
      .then((res) => {
        toast.success("Service muvaffaqiyatli o'chirildi");
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
</script>

<style scoped>
.modal-class {
  overflow: visible;
  display: flex;
  backdrop-filter: blur(6px);
}
</style> -->
