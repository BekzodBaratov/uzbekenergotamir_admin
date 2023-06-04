<template>
  <section>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium min-w-max">Mahalliylashtirilgan Mahsulotlar bo'limi</h3>
      <router-link to="/localProducts/add">
        <SButton variant="primary" class="ml-auto mt-3" >Add Admin</SButton>
      </router-link>
    </div>

    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
        <TheBaseTable :table-data="tableData" @delete="deleteHandle" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, watch } from "vue";
import TheBaseTable from "../../components/TheBaseTable.vue";
import SButton from "../../components/buttons/SButton.vue";
import { useLocalProductsStore } from "../../store/localProducts";
const store = useLocalProductsStore();

const tableData = reactive({ thead: [], tbody: [] });
watch(
  () => store.localProducts,
  (data) => {
    if (data.length) {
      tableData.thead = Object.keys(data[0]);
      tableData.tbody = data.map((el) => Object.values(el));
    }
  }
);

const deleteHandle = (id) => store.delLocalProducts(id);
onMounted(() => store.getAllLocalProducts());
</script>
