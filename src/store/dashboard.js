import { defineStore } from "pinia";
import axios from "axios";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    data: {},
  }),
  actions: {
    async getDashboardData() {
      try {
        const res = await axios.get("/dashboard");
        this.data = res.data.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
