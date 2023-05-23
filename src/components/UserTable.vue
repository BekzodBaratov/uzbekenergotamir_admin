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
      </tr>
    </thead>

    <tbody class="bg-white">
      <tr v-for="item in tableData.tbody" :key="item._id">
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div class="">
            <div class="text-sm leading-5 font-medium text-gray-900">
              {{ item?.username }}
            </div>
            <div class="text-sm leading-5 text-gray-500">
              {{ item?.email }}
            </div>
          </div>
        </td>

        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div class="text-sm leading-5 text-gray-900">
            {{ formatDate(item?.createdAt) }}
          </div>
        </td>

        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
          {{ item?.role }}
        </td>

        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
          <button
            class="bg-[#DC3545] text-white px-4 py-2 rounded-[8px] transition-all duration-300 hover:bg-[red]"
            @click="deleteUser(item._id)"
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
