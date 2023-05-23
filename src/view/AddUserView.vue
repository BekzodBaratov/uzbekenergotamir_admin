<template>
  <h2 class="text-[20px] font-semibold">Admin qo'shish bo'limi</h2>
  <form method="POST">
    <div class="grid md:w-1/2 mx-auto gap-2">
      <ProductInput v-model="form.username" placeholder="username" label="Ism" />
      <ProductInput v-model="form.email" input-type="email" placeholder="email" label="Email" />
      <ProductInput v-model="form.password" input-type="password" placeholder="******" label="Password" />
      <SButton variant="primary" type="submit" @click="handleSubmit">Saqlash</SButton>
    </div>
  </form>
</template>

<script setup>
import { reactive } from "vue";
import { useToast } from "vue-toastification";
import ProductInput from "../components/input/productInput.vue";
import SButton from "../components/buttons/SButton.vue";
import { admin } from "/src/store/admin";
const toast = useToast();
const store = admin();

const form = reactive({ username: "", email: "", password: "" });

const handleSubmit = (e) => {
  e.preventDefault();
  let formData = new FormData();
  formData.append("username", form.username);
  formData.append("email", form.email);
  formData.append("password", form.password);
  console.log(formData);
  fetchData(formData);
};

const fetchData = async (data) => {
  try {
    await store.addUser(data);
  } catch (error) {
    toast.error(error);
  } finally {
    form.username = "";
    form.email = "";
    form.password = "";
  }
};
</script>
