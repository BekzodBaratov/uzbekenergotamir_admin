<template>
  <h2 class="font-semibold pb-6 text-3xl">Product qo'shish bo'limi</h2>

  <form method="POST">
    <div class="space-y-8">
      <div class="grid md:grid-cols-2 w-full gap-2">
        <ProductInput v-model="form.title_uz" label="Sarlavha" />
        <ProductInput v-model="form.title_ru" label="Заголовок" />
        <ProductInput v-model="form.title_en" label="Title" />
        <Select class="w-full" :data="selectData" label="Yangiliklar" @getVal="chooseProduct"></Select>
      </div>

      <UploadImages :multiplebol="true" desc="Upload images" :error="''" image="" @upload="getImages" />

      <Textarea v-model="form.description_uz" placeholder="Ta'rif"></Textarea>
      <Textarea v-model="form.description_ru" placeholder="Описание"></Textarea>
      <Textarea v-model="form.description_en" placeholder="Description"></Textarea>

      <button
        type="submit"
        @click.prevent="handleSubmit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Saqlash
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import ProductInput from "../../components/input/productInput.vue";
import Textarea from "../../components/input/textarea.vue";
import UploadImages from "../../components/input/uploadImages.vue";
import Select from "../../components/input/select.vue";
import { useEnergyProductsStore } from "../../store/energyProduct";
import { useRouter } from "vue-router";
const store = useEnergyProductsStore();
const router = useRouter();

const selectData = [
  { value: "waterHeater", name: "Suv isitish" },
  { value: "solarPanel", name: "quyosh paneli" },
];

const form = reactive({
  category: "solarPanel",
  title_uz: "",
  title_ru: "",
  title_en: "",
  description_uz: "",
  description_ru: "",
  description_en: "",
  imageFiles: "",
});

const handleSubmit = async () => {
  if (form.imageFiles) {
    let formData = new FormData();
    if (form.imageFiles.length) {
      for (let i = 0; i < form.imageFiles.length; i++) {
        formData.append("images", form.imageFiles[i]);
      }
    }
    formData.append("category", form.category);
    formData.append("title_uz", form.title_uz);
    formData.append("title_ru", form.title_ru);
    formData.append("title_en", form.title_en);
    formData.append("description_uz", form.description_uz);
    formData.append("description_ru", form.description_ru);
    formData.append("description_en", form.description_en);
    await store.addEnergyProduct(formData);
    router.push("/energyProducts");
  }
};

const getImages = (e) => {
  form.imageFiles = e.files;
};
const chooseProduct = (val) => (form.category = val);
</script>

<style scoped>
.modal-class {
  overflow: visible;
  display: flex;
  backdrop-filter: blur(6px);
}
</style>
