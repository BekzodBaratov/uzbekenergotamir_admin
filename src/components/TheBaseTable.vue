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
          <p class="text-primary">{{ el }}</p>
        </td>

        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
          <button
            class="bg-[#DC3545] text-white px-4 py-2 rounded-[8px] transition-all duration-300 hover:bg-[red]"
            @click="deleteUser(item[0])"
          >
            O'chirish
          </button>
          <DeleteModal :is-open="openModal" @delete="emit('delete', deleteId)" @closeModal="openModal = $event" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed, ref } from "vue";
import formatDate from "/src/helpers/formatDate.js";
import DeleteModal from "/src/components/modal/DeleteModal.vue";

const props = defineProps(["tableData"]);
const tableData = computed(() => props.tableData);
const openModal = ref(false);
const deleteId = ref(null);

const deleteUser = (id) => {
  openModal.value = true;
  deleteId.value = id;
};
const emit = defineEmits(["delete"]);
</script>
