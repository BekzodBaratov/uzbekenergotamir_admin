import axios from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useLocalProductsStore = defineStore("localProducts", {
  state: () => ({
    localProducts: [],
    deleteLoading: false,
    loading: false,
    token: JSON.parse(sessionStorage.getItem("admin")).token,
  }),
  actions: {
    getAllLocalProducts: async function () {
      const toast = useToast();
      try {
        const res = await axios.get("/products", { headers: { "Accept-language": "ru" } });
        this.localProducts = res.data.products;
      } catch (error) {
        toast.error(error.message);
      }
    },
    addLocalProducts: async function (data) {
      const toast = useToast();
      this.loading = true;
      try {
        await axios.post("/products", data, { headers: { Authorization: "Bearer " + this.token } });
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        this.loading = false;
      }
    },
    delLocalProducts: async function (id) {
      const toast = useToast();
      this.deleteLoading = id;
      try {
        await axios.delete(`/products/${id}`, { headers: { Authorization: "Bearer " + this.token } });
        this.localProducts = this.localProducts.filter((el) => el._id != id);
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.deleteLoading = "";
      }
    },
  },
});
