<template>
  <h2 class="font-semibold pb-6 text-3xl">Mahalliylashtirilgan Mahsulotlarni qo'shish bo'limi</h2>

  <form method="POST">
    <div class="space-y-8">
      <UploadImages :multiplebol="false" desc="Upload images" error="" image="" @upload="getImages" />
      <div class="grid md:grid-cols-2 w-full gap-2">
        <ProductInput v-model="form.title_uz" label="Sarlavha" />
        <ProductInput v-model="form.title_ru" label="Заголовок" />
        <ProductInput v-model="form.title_en" label="Title" />
      </div>
      <Textarea v-model="form.description_uz" placeholder="Ta'rif"></Textarea>
      <Textarea v-model="form.description_ru" placeholder="Описание"></Textarea>
      <Textarea v-model="form.description_en" placeholder="Description"></Textarea>

      <SButton type="submit" variant="primary" :loading="store.loading" @click.prevent="handleSubmit">
        Saqlash
      </SButton>
    </div>
  </form>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import ProductInput from "../../components/input/productInput.vue";
import Textarea from "../../components/input/textarea.vue";
import SButton from "../../components/buttons/SButton.vue";
import UploadImages from "../../components/input/uploadImages.vue";
import { useLocalProductsStore } from "../../store/localProducts";
import { useRouter } from "vue-router";
const store = useLocalProductsStore();
const router = useRouter();

const form = reactive({
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
    formData.append("image", form.imageFiles);
    formData.append("title_uz", form.title_uz);
    formData.append("title_ru", form.title_ru);
    formData.append("title_en", form.title_en);
    formData.append("description_uz", form.description_uz);
    formData.append("description_ru", form.description_ru);
    formData.append("description_en", form.description_en);
    await store.addLocalProducts(formData);
    router.push("/localProducts");
  }
};

const getImages = (e) => (form.imageFiles = e.file);
</script>

<style scoped>
.modal-class {
  overflow: visible;
  display: flex;
  backdrop-filter: blur(6px);
}
</style>
