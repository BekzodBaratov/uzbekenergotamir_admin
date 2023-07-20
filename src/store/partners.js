import axios from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const usePartnerStore = defineStore("partners", {
  state: () => ({ partners: [], loading: false, token: JSON.parse(sessionStorage.getItem("admin")).token }),
  actions: {
    getAllPartners: async function () {
      const toast = useToast();
      try {
        const res = await axios.get("/partners", { headers: { Authorization: "Bearer " + this.token } });
        this.partners = res.data.partners;
      } catch (error) {
        toast.error(error.message);
      }
    },
    addPartner: async function (data) {
      const toast = useToast();
      this.loading = true;
      try {
        const res = await axios.post("/partners", data, { headers: { Authorization: "Bearer " + this.token } });
        this.partners.push({ image: { secure_url: res.data.partner.image.secure_url } });
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.loading = false;
      }
    },
    delPartner: async function (id) {
      const toast = useToast();
      try {
        await axios.delete(`/partners/${id}`, { headers: { Authorization: "Bearer " + this.token } });
        this.partners = this.partners.filter((partner) => partner._id !== id);
      } catch (error) {
        toast.error(error.message);
      }
    },
  },
});
