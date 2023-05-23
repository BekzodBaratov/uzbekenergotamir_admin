<template></template>
<!-- <template>
  <div>
    <h3 class="text-gray-700 text-3xl font-medium">Buyurtmalar</h3>
    <div class="mt-4">
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50  "
            >
              <tr>
                <th scope="col" class="px-6 py-3 text-left">Ismi</th>
                <th scope="col" class="px-6 py-3 text-left">Telefon raqami:</th>

                <th scope="col" class="px-6 py-3 text-left">Buyurtmalar</th>

                <th scope="col" class="p-4">Jami summa</th>
                <th scope="col" class="px-6 py-3">Buyurtma vaqti</th>
                <th scope="col" class="px-6 py-3">Holati</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b "
                v-for="(item, index) in orderList.orders"
                :key="index"
              >
                <th
                  scope="row"
                  class="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap "
                >
                  {{ item?.full_name }}
                </th>

                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-left text-gray-900 whitespace-nowrap "
                >
                  {{ item?.phone_number }}
                </th>

                <th
                  scope="row"
                  class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap  flex justify-start"
                >
                  <ul class="text-left">
                    <li v-for="(el, index) in item.products" :key="el">
                      <div class="flex items-center gap-[8px] mt-2">
                        <span class="font-medium">{{ index + 1 }}. &nbsp;</span>
                        <img
                          :src="el?.image_url"
                          alt="images"
                          class="w-[35px] h-[35px]"
                        />
                        <div>
                          <span class="font-medium mr-2">{{ el?.name }}</span> x
                          {{ el?.order_products?.amount }} ta
                        </div>
                      </div>
                    </li>
                  </ul>
                </th>
                <td class="px-6 py-4 text-center">
                  {{ numberFunction(item?.amount) }} UZS
                </td>

                <td class="px-6 py-4 text-center">
                  {{ formatDate(item?.createdAt) }}
                </td>

                <td class="px-6 py-4 text-center">
                  <div
                    class="font-medium text-red-600  hover:underline cursor-pointer"
                    @click="productDelete(item?.id)"
                  >
                    <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
                  </div>
                  <DeleteModal
                    :is-open="openDeleteModal"
                    @delete="fetchDeleteModal"
                    @closeModal="openDeleteModal = $event"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { computed, onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import numberFunction from "../helpers/formatNumber";
import formatDate from "../helpers/formatDate";
import DeleteModal from "../components/modal/DeleteModal.vue";

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

const orderList = ref([]);
function fetchOrderList() {
  axios
    .get("/orders")
    .then((res) => {
      orderList.value = res.data.data;
    })
    .catch(() => {
      toast.error("Yuklanishda xatoli yuz berdi!");
    });
}

const openDeleteModal = ref(false);
const deleteId = ref(null);
function productDelete(id) {
  openDeleteModal.value = true;
  deleteId.value = id;
}

function fetchDeleteModal() {
  axios
    .post(`/orders/${deleteId.value}`, { status: 1 })
    .then((res) => {
      toast.success("Muvaffaqiyatli o'chirildi");
      fetchOrderList();
    })
    .catch((err) => {
      toast.error("Xatolik yuz berdi");
    });
}

onMounted(() => {
  fetchProductsList();
  fetchOrderList();
});
</script> -->
