import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";

export const useEnergyProductsStore = defineStore("energyProducts", {
  state: () => ({ energyProducts: [] }),
  actions: {
    async getAllEnergyProducts() {
      const toast = useToast();
      try {
        const res = await axios.get("/energyProducts");
        this.energyProducts = res.data.energyProducts;
        console.log(res.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    async delEnergyProducts(id) {
      console.log(id);
    },
  },
});
