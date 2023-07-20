import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";

export const useCalculatesStore = defineStore("calculates", {
  state: () => ({
    calculates: [],
    deleteLoading: false,
    token: JSON.parse(sessionStorage.getItem("admin")).token,
  }),
  actions: {
    async getAllCalculates() {
      const toast = useToast();
      // const token = JSON.parse(sessionStorage.getItem('admin')).token
      try {
        const res = await axios.get("/calculates", { headers: { Authorization: "Bearer " + this.token } });
        this.calculates = res.data.calculates;
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    async addCalculates(data) {
      const toast = useToast();
      try {
        await axios.post(`/calculates`, data, { headers: { Authorization: "Bearer " + this.token } });
        toast.success("Calculate successfully deleted");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    async delCalculates(id) {
      const toast = useToast();
      this.deleteLoading = id;
      try {
        await axios.delete(`/calculates/${id}`, { headers: { Authorization: "Bearer " + this.token } });
        toast.success("Calculate successfully deleted");
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        this.deleteLoading = "";
      }
    },
  },
});
