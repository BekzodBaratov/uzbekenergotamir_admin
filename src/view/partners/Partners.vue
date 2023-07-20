<template>
  <section>
    <div class="flex justify-between flex-wrap gap-4 items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium min-w-max">Partners bo'limi</h3>
      <router-link to="/partners/add">
        <SButton variant="primary">Yangi Partner qo'shish</SButton>
      </router-link>
    </div>
    <div v-if="store.partners.length" class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
      <div
        v-for="partner in store.partners"
        class="relative bg-white p-8 rounded-xl flex justify-center items-center group"
        :key="partner._id"
      >
        <img :src="partner.image.secure_url" alt="image" />
        <div class="absolute inset-0 bg-[#0003] rounded-xl sm:hidden sm:group-hover:flex justify-center items-center">
          <SButton @click="delPartner(partner._id)" variant="danger">Delete</SButton>
        </div>
      </div>
    </div>
    
    <div v-else>
      <h2 class="text-gray-700 text-3xl font-medium min-w-max text-center mt-20">
        Partners Not Found
      </h2>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import SButton from "/src/components/buttons/SButton.vue";
import { usePartnerStore } from "../../store/partners";
const store = usePartnerStore();

const delPartner = (id) => store.delPartner(id);
onMounted(() => store.getAllPartners());
</script>
