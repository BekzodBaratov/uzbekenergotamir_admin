import { defineStore, storeToRefs } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";

export const useEnergyProductsStore = defineStore("energyProducts", {
  state: () => ({
    energyProducts: [],
    loading: false,
    deleteLoading: "",
    token: JSON.parse(sessionStorage.getItem("admin")).token,
  }),
  actions: {
    async getAllEnergyProducts() {
      const toast = useToast();
      try {
        const res = await axios.get("/energyProducts", { headers: { "Accept-language": "ru" } });
        this.energyProducts = res.data.energyProducts;
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    addEnergyProduct: async function (data) {
      const toast = useToast();
      try {
        await axios.post("/energyProducts", data, { headers: { Authorization: "Bearer " + this.token } });
        toast.success("product successfully created");
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        this.loading = fasle;
      }
    },
    async delEnergyProducts(id) {
      const toast = useToast();
      this.deleteLoading = id;
      try {
        await axios.delete(`/energyProducts/${id}`, { headers: { Authorization: "Bearer " + this.token } });
        this.energyProducts = this.energyProducts.filter((el) => el._id !== id);
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.deleteLoading = "";
      }
    },
  },
});
