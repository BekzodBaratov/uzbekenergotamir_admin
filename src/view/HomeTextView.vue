<template></template>
<!-- <template>
  <div>
    <h2 class="text-[20px] font-semibold">Home banner bo'limi</h2>
    <div class="flex gap-[20px]">
      <div class="w-full">
        <Textarea class="mt-4" placeholder="Birinchi text" v-model="form.firstText" />
        <Textarea class="mt-4" placeholder="Ikkinchi text" v-model="form.secondText" />
      </div>
      <div class="w-full">
        <Textarea class="mt-4" placeholder="Uchinchi text" v-model="form.thirdText" />
        <UploadImages class="w-full" @upload="getImages" />
      </div>
    </div>
    <SButton variant="info" class="ml-auto w-[300px] mt-5" @click="onSubmit">Saqlash</SButton>
  </div>
</template>
<script setup>
import Textarea from "../components/input/textarea.vue";
import UploadImages from "../components/input/uploadImages.vue";
import SButton from "../components/buttons/SButton.vue";
import { reactive } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
const toast = useToast();

const form = reactive({
  image: "",
  backgroundImage: "",
  firstText: "",
  secondText: "",
  thirdText: "",
});

function getImages(e) {
  form.image = e.file;
  form.backgroundImage = e.file;
}

function onSubmit() {
  let formData = new FormData();
  formData.append("image", form.image);
  formData.append("backgroundImage", form.image);
  formData.append("firstText", form.firstText);
  formData.append("secondText", form.secondText);
  formData.append("thirdText", form.thirdText);
  axios
    .post("/spiners", formData)
    .then((res) => {
      toast.success("Muvaffaqiyatli jo'natildi");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch(() => {
      toast.error("Xatolik yuz berdi");
    })
    .finally(() => {
      form.firstText = "";
      form.secondText = "";
      form.thirdText = "";
    });
}
</script> -->
