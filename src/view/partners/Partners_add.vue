<template>
  <section class="space-y-8">
    <h2 class="text-[20px] font-semibold">Partner qo'shish bo'limi</h2>

    <form method="POST">
      <div class="space-y-6">
        <UploadImages :multiplebol="false" desc="Upload Partner images" :error="''" image="" @upload="getImages" />

        <SButton type="submit" @click.prevent="handleSubmit" variant="primary" :loading="store.loading">
          Saqlash
        </SButton>
      </div>
    </form>
  </section>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import UploadImages from "../../components/input/uploadImages.vue";
import { usePartnerStore } from "../../store/partners";
import SButton from "../../components/buttons/SButton.vue";
import { useRouter } from "vue-router";
const store = usePartnerStore();
const router = useRouter();

const form = reactive({
  imageFiles: "",
});

function getImages(e) {
  form.imageFiles = e.file;
}
async function handleSubmit() {
  let formData = new FormData();
  if (form.imageFiles) {
    formData.append("image", form.imageFiles);
    await store.addPartner(formData);
    router.push("/partners");
  }
}
</script>

<style scoped>
.modal-class {
  overflow: visible;
  display: flex;
  backdrop-filter: blur(6px);
}
</style>
