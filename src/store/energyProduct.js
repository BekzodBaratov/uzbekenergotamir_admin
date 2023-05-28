import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";

export const useEnergyProductsStore = defineStore("energyProducts", {
  state: () => ({ energyProducts: [] }),
  actions: {
    async getAllEnergyProducts() {
      const toast = useToast();
      try {
        const res = await axios.get("/energyProducts", { headers: { "Accept-language": "ru" } });
        this.energyProducts = res.data.energyProducts;
        console.log(res.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    addEnergyProduct: async function (data) {
      const toast = useToast();
      try {
        await axios.post("/energyProducts", data);
        toast.success("product successfully created");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    async delEnergyProducts(id) {
      const toast = useToast();
      try {
        await axios.delete(`/energyProducts/${id}`);
        this.energyProducts = this.energyProducts.filter((el) => el._id !== id);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
  },
});
