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

      <!-- <RouterLink
        class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
        to="/products"
      >
        <img class="w-6 h-6" src="/src/assets/icons/edit.svg" alt="edit" />
        <span class="mx-3">Products</span>
      </RouterLink>

      <RouterLink
        class="flex items-center px-6 py-2 mt-4 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
        to="/services"
      >
        <img class="w-6 h-6" src="/src/assets/icons/dashboard_diagram.svg" alt="test" />
        <span class="mx-3">Services</span>
      </RouterLink>

      <RouterLink
        class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
        to="/categories"
      >
        <img class="w-6 h-6" src="/src/assets/icons/menu.svg" alt="menu" />
        <span class="mx-3">Kategoriya</span>
      </RouterLink> -->
      <!-- <RouterLink
        @click="handleNav('/configuration')"
        class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
        :class="'/configuration' ? 'text-gray-100 bg-opacity-25 bg-gray-700' : 'text-gray-500'"
        to="/configuration"
      >
        <img class="w-6 h-6" src="/src/assets/icons/menu.svg" alt="menu" />
        <span class="mx-3">Configuration</span>
      </RouterLink>
      <RouterLink
        @click="handleNav('/slider')"
        class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
        :class="'/slider' ? 'text-gray-100 bg-opacity-25 bg-gray-700' : 'text-gray-500'"
        to="/slider"
      >
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
          />
        </svg>

        <span class="mx-3">Reklama</span>
      </RouterLink>
      <RouterLink
        @click="handleNav('/home')"
        class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
        :class="'/home' ? 'text-gray-100 bg-opacity-25 bg-gray-700' : 'text-gray-500'"
        to="/home"
      >
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
          />
        </svg>

        <span class="mx-3">Home | Text | Rasm</span>
      </RouterLink>
      <RouterLink
        @click="handleNav('/about')"
        class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
        :class="'/about' ? 'text-gray-100 bg-opacity-25 bg-gray-700' : 'text-gray-500'"
        to="/about"
      >
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
          />
        </svg>

        <span class="mx-3">About</span>
      </RouterLink> -->
    </nav>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const emit = defineEmits(["closeSidebar"]);
const props = defineProps(["sidebarOpen"]);

const routes = reactive([
  {
    id: 1,
    name: "Calculates",
    path: "/calculates",
    icon: "/src/assets/icons/dashboard_diagram.svg",
  },
]);
</script>

<style scoped>
.router-link-active,
.router-link-exact-active {
  @apply text-gray-100 bg-opacity-25 bg-gray-700;
}
</style>
<!-- :class="'/categories' ? 'text-gray-100 bg-opacity-25 bg-gray-700' : 'text-gray-500'" -->
