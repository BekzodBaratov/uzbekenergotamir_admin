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
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
    async addCalculates(data) {
      const toast = useToast();
      try {
        const res = await axios.post(`/calculates`, data);
        console.log(res);
        // toast.success("Calculates successfully deleted");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
    async delCalculates(id) {
      const toast = useToast();
      try {
        const res = await axios.delete(`/calculates/${id}`);
        console.log(res);
        toast.success("Calculates successfully deleted");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  },
});
