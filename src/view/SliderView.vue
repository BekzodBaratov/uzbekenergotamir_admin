<template>
  <div>
    <h3 class="text-gray-700 text-3xl font-medium">Reklama bo'limi</h3>
    <form class="mt-6">
      <div class="flex">
        <UploadImages @upload="getImages" class="w-full" />
        <div class="flex flex-col w-full">
          <Input label="Reklama nomini kiriting:" v-model="sliderName" placeholder="Reklama nomini kiriting..." />
          <Select
            class="w-full"
            :data="productList.products"
            label="Productni tanlang"
            :modelLabel="sliderLabel"
            @getVal="chooseProduct"
          />
          <SButton variant="info" @click="postData">Qo'shish</SButton>
        </div>
      </div>
    </form>
    <div class="mt-10">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <!-- <table class="w-full text-sm text-left text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" class="p-4">ID</th>
              <th scope="col" class="px-6 py-3">Rasmi</th>
              <th scope="col" class="px-6 py-3">Nomi</th>
              <th scope="col" class="px-6 py-3 flex items-center justify-end">Amallar</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b "
              v-for="(item, index) in sliderList?.swapers"
              :key="index"
            >
              <td class="w-4 p-4">
                <p class="font-bold">{{ index + 1 }}.</p>
              </td>

              <th class="text-center px-4">
                <img :src="item?.imageUrl" alt="images" class="w-[40px] h-[40px]" />
              </th>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {{ item?.title }}
              </th>
              <td class="flex items-center px-6 py-4 space-x-4 justify-end">
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
        </table> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import UploadImages from "../components/input/uploadImages.vue";
import SButton from "../components/buttons/SButton.vue";
import Select from "../components/input/select.vue";
import Input from "../components/input/productInput.vue";
import DeleteModal from "../components/modal/DeleteModal.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { onMounted, ref } from "vue";
const toast = useToast();

const productList = ref([]);
const sliderList = ref([]);

const sliderName = ref("");
const openDeleteModal = ref(false);
const sliderLabel = ref("Productni tanlang");

let formData = new FormData();
function getImages(e) {
  formData.append("image", e.file);
}

function chooseProduct(e) {
  formData.append("productId", e);
}

const deleteId = ref(null);
function productDelete(id) {
  deleteId.value = id;
  openDeleteModal.value = true;
}

function fetchDeleteModal(e) {
  console.log(e, "emit");
  if (e) {
    axios
      .delete(`swapers/${deleteId.value}`)
      .then(() => {
        toast.success("Muvaffaqiyatli o'chirildi");
        fetchSliderList();
      })
      .catch(() => {
        toast.error("O'chirishda xatoli yuz berdi!");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
  }
}

function postData() {
  formData.append("title", sliderName.value);

  axios
    .post("/swapers", formData)
    .then((res) => {
      toast.success("Muvaffaqiyatli qo'shildi");
      fetchSliderList();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch((err) => {
      toast.error("Qo'shishda xatolik yuz berdi");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    })
    .finally(() => {
      sliderName.value = "";
      sliderLabel.value = "Productni tanlang";
    });
}

const fetchProfuctList = () => {
  axios.get("/products").then((res) => {
    productList.value = res.data.data;
  });
};

function fetchSliderList() {
  axios.get("/swapers").then((res) => {
    sliderList.value = res.data.data;
  });
}

onMounted(() => {
  fetchProfuctList();
  fetchSliderList();
});
</script>
