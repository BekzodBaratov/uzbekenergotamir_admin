<template>
  <!-- <pre>{{ tableData }}</pre> -->
  <table class="min-w-full">
    <thead>
      <tr>
        <th
          class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          v-for="(thead, i) in tableData.thead"
          :key="i"
        >
          {{ thead }}
        </th>
        <th
          class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
        ></th>
      </tr>
    </thead>

    <tbody class="bg-white">
      <tr v-for="item in tableData.tbody" :key="item[0]">
        <td v-for="el in item" :key="el" class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <p v-if="typeof el !== 'object'" class="line-clamp-3">{{ el }}</p>
          <img class="w-full" v-else-if="el.length >= 2" :src="el[0].secure_url" alt="image" />
          <img class="w-full" v-else :src="el.secure_url" alt="image" />
        </td>

        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
          <SButton variant="primary" :loading="props.isLoading == item[0]" @click="deleteUser(item[0])">
            O'chirish
          </SButton>
          <DeleteModal :is-open="openModal" @delete="emit('delete', deleteId)" @closeModal="openModal = $event" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed, ref } from "vue";
import DeleteModal from "/src/components/modal/DeleteModal.vue";
import SButton from "./buttons/SButton.vue";

const props = defineProps(["tableData", "isLoading"]);
const tableData = computed(() => props.tableData);
const openModal = ref(false);
const deleteId = ref(null);

const deleteUser = (id) => {
  openModal.value = true;
  deleteId.value = id;
};
const emit = defineEmits(["delete"]);
</script>

<style scoped>
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
