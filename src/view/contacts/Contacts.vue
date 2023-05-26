<template>
  <section>
    <div class="mb-4">
      <h3 class="text-gray-700 text-3xl font-medium min-w-max">Contacts bo'limi</h3>
    </div>

    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
        <TheBaseTable :table-data="tableData" @delete="delContact" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, watch } from "vue";
import TheBaseTable from "../../components/TheBaseTable.vue";
import { useContactsStore } from "../../store/contacts";
const store = useContactsStore();

const tableData = reactive({ thead: [], tbody: [] });
watch(
  () => store.contacts,
  (data) => {
    if (data.length) {
      tableData.thead = Object.keys(data[0]);
      tableData.tbody = data.map((el) => Object.values(el));
    }
  }
);

const delContact = (id) => store.delContacts(id);
onMounted(() => store.getAllContacts());
</script>
