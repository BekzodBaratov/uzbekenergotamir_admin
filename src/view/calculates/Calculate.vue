<template>
  <section>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium">Product bo'limi</h3>
      <router-link to="/calculates/add">
        <SButton variant="primary">Yangi product qo'shish </SButton>
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
import { useCalculatesStore } from "../../store/calculate";
const store = useCalculatesStore();

store.getAllCalculates();

const tableData = reactive({
  thead: ["_id", "name", "phone", "Send Place", "recive Place", "Service"],
  tbody: [],
});
watch(
  () => store.calculates,
  (data) => {
    const dataValue = data.map((el) => Object.values(el));
    const dataKeys = data.map((el) => Object.keys(el));
    tableData.tbody = dataValue;
    tableData.thead = dataKeys[0];
  }
);

function fetchDelete(id) {
  store.delCalculates(id);
}
</script>
