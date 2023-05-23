<template></template>
<!-- <template>
  <div>
    <h2 class="text-[20px] font-semibold">About banner bo'limi</h2>
    <div class="flex flex-col gap-[20px] mt-5">
      <div class="w-full flex gap-[20px]">
        <UploadImages class="w-full" @upload="getImages" />
      </div>
      <div class="w-full">
        <Textarea placeholder="About Text" v-model="form.firstText" />
      </div>
    </div>
    <SButton variant="info" class="ml-auto w-[300px] mt-3" @click="onSubmit"
      >Saqlash</SButton
    >
  </div>
</template>
<script setup>
import Textarea from "../components/input/textarea.vue";
import UploadImages from "../components/input/uploadImages.vue";
import SButton from "../components/buttons/SButton.vue";
import { reactive, ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const form = reactive({
  image: "",
  firstText: "",
});

function getImages(e) {
  form.image = e.file;
}

function onSubmit() {
  const formData = new FormData();
  const imageArr = [form.image];
  formData.append("images", form.image);
  formData.append("text", form.firstText);

  console.log(form);
  axios
    .post("/about", formData)
    .then((res) => {
      console.log(res);
      toast.success("Muvaffaqiyatli qo'shildi");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch((err) => {
      console.log(arr, "err");
      toast.error("Xatolik yuz berdi");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
}
</script> -->
