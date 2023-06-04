<template>
  <div
    v-cloak
    :class="sidebarOpen ? 'block' : 'hidden'"
    @click="emit('closeSidebar')"
    class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
  ></div>

  <div
    v-cloak
    :class="sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
    class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0"
  >
    <div class="flex items-center justify-center mt-8">
      <RouterLink to="/" class="flex items-center bg-transparent">
        <img class="w-12 h-12" src="/src/assets/icons/dashboard.svg" alt="dashboard" />
        <span class="mx-2 text-2xl font-semibold text-white">Dashboard</span>
      </RouterLink>
    </div>

    <nav class="mt-10">
      <RouterLink
        v-for="route in routes"
        :key="route.id"
        class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
        :to="route.path"
      >
        <img class="w-6 h-6" :src="route.icon" :alt="route.name" />
        <span class="mx-3">{{ route.name }}</span>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { reactive } from "vue";

import dashboard from "/src/assets/icons/dashboard.svg"
import dashboard_diagram from "/src/assets/icons/dashboard_diagram.svg"
import user from "/src/assets/icons/user.svg"
import menu from "/src/assets/icons/menu.svg"
import shop from "/src/assets/icons/shop.svg"
import market from "/src/assets/icons/market.svg"

const emit = defineEmits(["closeSidebar"]);
const props = defineProps(["sidebarOpen"]);

const routes = reactive([
  {
    id: 0,
    name: "Dashboard",
    path: "/",
    icon: dashboard,
  },
  {
    id: 1,
    name: "Products",
    path: "/energyProducts",
    icon: dashboard_diagram,
  },
  {
    id: 2,
    name: "Partners",
    path: "/partners",
    icon: user,
  },
  {
    id: 3,
    name: "Contacts",
    path: "/contacts",
    icon: menu,
  },
  {
    id: 4,
    name: "Local Products",
    path: "/localProducts",
    icon: shop,
  },
  {
    id: 5,
    name: "News",
    path: "/news",
    icon: market,
  },
  {
    id: 6,
    name: "Calculates",
    path: "/calculates",
    icon: menu,
  },
]);
</script>

<style scoped>
nav .router-link-active,
nav .router-link-exact-active {
  @apply text-gray-100 bg-opacity-25 bg-gray-700;
}
</style>
