<template>
  <div>
    <h3 class="text-gray-700 text-3xl font-medium">Dashboard</h3>

    <div class="mt-4 px-6">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 -mx-6">
        <StatisticCard v-for="card in statisticCardArr" :key="card.id" :data="card" />
      </div>
    </div>

    <div class="flex flex-col mt-8 gap-3">
      <SButton variant="primary" class="ml-auto mt-3" @click="onSubmit">Add User</SButton>
      <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <Table :tableData="tableData" @delete="fetchDelete"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "@vue/runtime-core";
import StatisticCard from "../cards/statistic.card.vue";
import Table from "/src/components/UserTable.vue";
import SButton from "../buttons/SButton.vue";
import { useDashboardStore } from "/src/store/dashboard";
import { admin } from "/src/store/admin";
import { useRouter } from "vue-router";
const dashboardStore = useDashboardStore();
const adminsStore = admin();
const router = useRouter();
dashboardStore.getDashboardData();
adminsStore.getAllUsers();

const statisticCardArr = reactive([
  {
    id: 1,
    title: "Adminlar",
    icon: "/src/assets/icons/user.svg",
    number: 0,
  },
  {
    id: 2,
    title: "Quyosh panellari",
    icon: "/src/assets/icons/market.svg",
    number: 0,
  },
  {
    id: 3,
    title: "Suv Isituvchi Panellar",
    icon: "/src/assets/icons/shop.svg",
    number: 0,
  },
]);
watch(
  () => dashboardStore.data,
  () => {
    statisticCardArr[0].number = dashboardStore.data.userCount;
    statisticCardArr[1].number = dashboardStore.data.solarPanel;
    statisticCardArr[2].number = dashboardStore.data.waterHeater;
  }
);
const tableData = reactive({
  thead: ["ISMI", "OBUNA VAQTI", "ROLE", ""],
  tbody: [],
});
watch(
  () => adminsStore.users,
  (data) => (tableData.tbody = data)
);
const fetchDelete = (id) => adminsStore.delUser(id);
const onSubmit = () => {
  router.push("/users/add");
};
</script>

<style scoped>
.modal-class {
  overflow: visible;
  display: flex;
  backdrop-filter: blur(6px);
}
</style>
