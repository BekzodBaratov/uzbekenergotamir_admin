<template>
  <section>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium">Product bo'limi</h3>
      <router-link to="/energyProducts/add">
        <SButton variant="primary">Yangi Product qo'shish</SButton>
      </router-link>
    </div>

    <div v-if="store.energyProducts.length" class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Table :tableData="tableData" :isLoading="store.deleteLoading" @delete="fetchDelete"></Table>
    </div>
    <div v-else>
      <h2 class="text-gray-700 text-3xl font-medium min-w-max text-center mt-20">Products Not Found</h2>
    </div>
  </section>
</template>

<script setup>
import { reactive, watch } from "vue";
import SButton from "/src/components/buttons/SButton.vue";
import Table from "/src/components/TheBaseTable.vue";
import { useEnergyProductsStore } from "../../store/energyProduct";
const store = useEnergyProductsStore();

store.getAllEnergyProducts();

const tableData = reactive({ thead: [], tbody: [] });
watch(
  () => store.energyProducts,
  (data) => {
    if (data.length) {
      tableData.thead = Object.keys(data[0]);
      tableData.tbody = data.map((el) => Object.values(el));
    }
  }
);
const fetchDelete = (id) => {
  store.delEnergyProducts(id);
  store.deleteLoading = id;
};
</script>
