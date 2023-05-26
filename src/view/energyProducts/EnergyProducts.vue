<template>
  <section>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium">Product bo'limi</h3>
      <router-link to="/energyProducts/add">
        <SButton variant="primary">Yangi Product qo'shish</SButton>
      </router-link>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Table :tableData="tableData" @delete="fetchDelete"></Table>
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
    console.log(tableData);
    console.log(data[0]);
    if (data.length) {
      tableData.thead = Object.keys(data[0]);
      tableData.tbody = data.map((el) => {
        el.images = el.images[0];
        return Object.values(el);
      });
    }
  }
);
// watch(
//   () => store.localProducts,
//   (data) => {
//     if (data.length) {
//       tableData.thead = Object.keys(data[0]);
//       tableData.tbody = data.map((el) => {
//         if (typeof el == "object") {
//           return Object.values(el[0]);
//         } else {
//           return Object.values(el);
//         }
//       });
//     }
//   }
// );

const fetchDelete = (id) => store.delEnergyProducts(id);
</script>
