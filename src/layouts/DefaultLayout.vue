<template>
  <div class="flex h-screen bg-gray-200 font-roboto">
    <SidebarVue @closeSidebar="closeSidebar" :sidebarOpen="sidebarOpen" />
    <div class="flex-1 flex flex-col overflow-hidden">
      <HeaderVue @openSidebar2="openSidebar" />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import SidebarVue from "../components/sidebar/Sidebar.vue";
import HeaderVue from "../components/header/Header.vue";

const sidebarOpen = ref(false);
const closeSidebar = () => (sidebarOpen.value = false);
const openSidebar = () => (sidebarOpen.value = true);
</script>
