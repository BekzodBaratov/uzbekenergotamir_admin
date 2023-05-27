import axios from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const usePartnerStore = defineStore("partners", {
  state: () => ({ partners: [] }),
  actions: {
    getAllPartners: async function () {
      const toast = useToast();
      try {
        const res = await axios.get("/partners");
        this.partners = res.data.partners;
      } catch (error) {
        toast.error(error.message);
      }
    },
    addPartner: async function (data) {
      const toast = useToast();
      try {
        const res = await axios.post("/partners", data);
        this.partners.push({ image: { secure_url: res.data.partner.image.secure_url } });
      } catch (error) {
        toast.error(error.message);
      }
    },
    delPartner: async function (id) {
      const toast = useToast();
      try {
        await axios.delete(`/partners/${id}`);
        this.partners = this.partners.filter((partner) => partner._id !== id);
      } catch (error) {
        toast.error(error.message);
      }
    },
  },
});
