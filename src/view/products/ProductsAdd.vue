<template>
  <h2 class="text-[20px] font-semibold">Productlarni qo'shish bo'limi</h2>
  <form method="POST">
    <div class="flex w-full gap-10">
      <ProductInput v-model="form.name" placeholder="Nomi" label="Nomi" />
      <ProductInput
        v-model="form.price"
        input-type="number"
        placeholder="Narxi"
        label="Narxi"
      />
    </div>

    <div class="flex w-full gap-10">
      <ProductInput v-model="form.colors" placeholder="Rangi" label="Rangi" />
      <ProductInput
        v-model="form.condition"
        placeholder="Holati"
        label="Holati"
      />
    </div>

    <div class="flex w-full gap-10 items-center">
      <Select
        v-if="category.length"
        class="w-full"
        label="Kategoriyani tanlang"
        :data="category"
        @getVal="selectVal($event)"
      />
      <Select
        v-if="configuration.length"
        class="w-full"
        label="Confugratsiyani tanlang"
        modelLabel="Confugratsiyani tanlang"
        :isType="true"
        :data="configuration"
        @getVal="selectConfigration($event)"
      />
    </div>

    <UploadImages @upload="getImages" />

    <div>
      <p class="mt-4">Products xusisiyatlarini qo'shing:</p>
      <div class="w-full mb-4 my-2">
        <form class="w-full" @submit="addService">
          <input
            type="text"
            v-model="service"
            class="w-full rounded-md h-[40px] px-4 outline-none"
            placeholder="Xarakteristika qo'shish"
          />
        </form>
        <div
          class="my-2 w-full bg-white p-2 flex justify-between"
          v-for="(item, ind) in form.features"
          :key="ind"
        >
          <div>
            <span class="font-medium mr-2">{{ ind + 1 }}.</span>{{ item }}
          </div>
          <div
            class="flex items-center justify-end gap-3 flex-shrink-0 max-w-[200px] w-full"
          >
            <i
              class="fa-solid fa-pen-to-square text-[blue] cursor-pointer"
              @click="editService(ind)"
            ></i>
            <AddModal
              label="Service turini tahrirlash"
              :isOpen="openModalService"
              :value="editServiceText"
              @closeModal="openModalService = $event"
              @fetchModal="getModalService"
            />
            <i
              class="fa-solid fa-trash text-[red] cursor-pointer"
              @click="deleteService(ind)"
            ></i>
          </div>
        </div>
      </div>
    </div>

    <Textarea
      v-model="form.description"
      placeholder="Qisqacha sharhi"
      class="mt-5"
    />

    <SButton variant="primary_dark" type="submit" @click="handleSubmit">
      Saqlash
    </SButton>
  </form>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { useToast } from "vue-toastification";
import ProductInput from "../../components/input/productInput.vue";
import Textarea from "../../components/input/textarea.vue";
import UploadImages from "../../components/input/uploadImages.vue";
import Select from "../../components/input/select.vue";
import { onMounted } from "vue";
import SButton from "../../components/buttons/SButton.vue";

import AddModal from "../../components/modal/AddModal.vue";

const toast = useToast();

const service = ref("");
const editServiceText = ref("");
const idEdit = ref("");

const form = reactive({
  category_id: null,
  configuration_id: null,
  name: "",
  description: "",
  condition: "",
  price: "",
  imageFiles: "",
  colors: "",
  features: ["RAM 8GB"],
});

// specification

const openModalService = ref(false);

function getModalService(emit) {
  openModalService.value = false;
  form.features[idEdit.value] = emit;
}

function deleteService(id) {
  form.features = form.features.filter((el, item) => item !== id);
}

function editService(id) {
  openModalService.value = true;
  idEdit.value = id;
  editServiceText.value = form.features[id];
}

function addService(e) {
  e.preventDefault();
  if (service.value !== "") {
    form.features.push(service.value);
    service.value = "";
  }
}

// ++++

function selectVal(e) {
  form.category_id = e;
}

function selectConfigration(e) {
  form.configuration_id = e;
}

const handleSubmit = (e) => {
  e.preventDefault();

  if (form.imageFiles) {
    let formData = new FormData();
    formData.append("imageFiles", form.imageFiles);
    formData.append("category_id", form.category_id);
    formData.append("configuration_id", form.configuration_id);
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("condition", form.condition);
    formData.append("colors", form.colors);
    formData.append("specifications", JSON.stringify(form.features));
    fetchData(formData);
  }
};

function getImages(e) {
  form.imageFiles = e.file;
}

const fetchData = (data) => {
  axios({
    method: "POST",
    url: "products",
    withCredentials: true,
    data: data,
  })
    .then((res) => {
      toast.success("Mahsulot muvaffaqiyatli qo'shildi");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    })
    .catch((err) => {
      toast.error("Qo'shishda xatoli yuz berdi!");
    })
    .finally(() => {
      form.name = "";
      form.price = "";
      form.colors = "";
      form.description = "";
      form.condition = "";
      form.category_id = "";
      form.configuration_id = "";
      form.imageFiles = "";
      form.specifications = {};
    });
};

const category = ref([]);
const configuration = ref([]);

function getCategoryList() {
  axios.get("/categories").then((res) => {
    category.value = res.data.data.categories;
  });
}

function fetchConfigurationList() {
  axios.get("/configurations").then((res) => {
    configuration.value = res.data.data.configurations;
  });
}

onMounted(() => {
  getCategoryList();
  fetchConfigurationList();
});
</script>
