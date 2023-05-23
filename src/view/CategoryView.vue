<template></template>
<!-- <template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium">Kategoriya bo'limi</h3>
      <SButton variant="info" @click="openAddMOdal"
        >Yangi Kategoriya qo'shish</SButton
      >
    </div>

    <AddModal
      :isOpen="openModal"
      :loading="modalLoading"
      :value="editModalVal"
      @closeModal="openModal = $event"
      @fetchModal="getModalItem"
    />
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 ">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50  "
        >
          <tr>
            <th scope="col" class="p-4">ID</th>
            <th scope="col" class="px-6 py-3">Nomi</th>
            <th scope="col" class="px-6 py-3 flex items-center justify-end">
              Amallar
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b "
            v-for="(item, index) in categoryList"
            :key="index"
          >
            <td class="w-4 p-4">
              <p class="font-bold">{{ index + 1 }}.</p>
            </td>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
            >
              {{ item?.name }}
            </th>
            <td class="flex items-center px-6 py-4 space-x-4 justify-end">
              <div
                @click="openEditModal(item.name, item.id)"
                class="font-medium text-blue-600  hover:underline cursor-pointer"
              >
                <i
                  class="fa-solid fa-pen-to-square text-[blue] text-[20px]"
                ></i>
              </div>
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
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import SButton from "../components/buttons/SButton.vue";
import AddModal from "../components/modal/AddModal.vue";
import DeleteModal from "../components/modal/DeleteModal.vue";

const toast = useToast();

const openModal = ref(false);
const openDeleteModal = ref(false);
const modalLoading = ref(false);
const editModalVal = ref("");
const isEdit = ref(false);
const editId = ref(null);
const deleteId = ref(null);

function openEditModal(name, id) {
  editModalVal.value = name;
  openModal.value = true;
  isEdit.value = true;
  editId.value = id;
}

function openAddMOdal() {
  editModalVal.value = "";
  openModal.value = true;
  isEdit.value = false;
}

function getModalItem(emit) {
  if (!isEdit.value) {
    modalLoading.value = true;
    axios
      .post("/categories", { name: emit })
      .then((res) => {
        editModalVal.value = "";
        fetchCategoryList();
      })
      .catch((err) => {
        toast.error("Kategoriya qo'shishda xatolik yuz berdi!");
      })
      .finally(() => {
        modalLoading.value = false;
      });
  } else {
    modalLoading.value = true;
    axios
      .patch(`/categories/${editId.value}`, { name: emit })
      .then((res) => {
        fetchCategoryList();
      })
      .catch((err) => {
        toast.error("Kategoriyani tahrirlashda xatolik yuz berdi!");
      })
      .finally(() => {
        modalLoading.value = false;
      });
  }
}

const categoryList = ref([]);

function fetchDeleteModal(emit) {
  if (emit) {
    axios
      .delete(`/categories/${deleteId.value}`)
      .then((res) => {
        toast.success("Kategoriya muvaffaqiyatli o'chirildi");
        fetchCategoryList();
      })
      .catch((res) => {
        toast.error("Xatolik yuz berdi");
      });
  }
}

function productDelete(id) {
  openDeleteModal.value = true;
  deleteId.value = id;
}

function fetchCategoryList() {
  axios.get("/categories").then((res) => {
    categoryList.value = res.data.data.categories;
  });
}
onMounted(() => {
  fetchCategoryList();
});
</script> -->
