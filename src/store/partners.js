import axios from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const usePartnerStore = defineStore("partners", {
  state: () => ({ partners: [] }),
  actions: {
    getAllPartners: async () => {
      const toast = useToast();
      try {
        const res = await axios.get("/partners");
        console.log(res);
        this.partners = res.data.partners;
      } catch (error) {
        toast.error(error.message);
      }
    },
  },
});
