import axios from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useLocalProductsStore = defineStore("localProducts", {
  state: () => ({ localProducts: [] }),
  actions: {
    getAllLocalProducts: async function () {
      const toast = useToast();
      try {
        const res = await axios.get("/products", { headers: { "Accept-language": "ru" } });
        this.localProducts = res.data.products;
        console.log(this.localProducts);
      } catch (error) {
        toast.error(error.message);
      }
    },
    addLocalProducts: async function (data) {
      const toast = useToast();
      try {
        await axios.post("/products", data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    delLocalProducts: async function (id) {
      const toast = useToast();
      try {
        await axios.delete(`/products/${id}`);
        this.localProducts = this.localProducts.filter((el) => el._id !== id);
      } catch (error) {
        toast.error(error.message);
      }
    },
  },
});
