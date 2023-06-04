import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";

export const useCalculatesStore = defineStore("calculates", {
  state: () => ({ calculates: [] }),
  actions: {
    async getAllCalculates() {
      const toast = useToast();
      try {
        const res = await axios.get("/calculates");
        this.calculates = res.data.calculates;
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    async addCalculates(data) {
      const toast = useToast();
      try {
        await axios.post(`/calculates`, data);
        toast.success("Calculate successfully deleted");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    async delCalculates(id) {
      const toast = useToast();
      try {
        await axios.delete(`/calculates/${id}`);
        toast.success("Calculate successfully deleted");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  },
});
