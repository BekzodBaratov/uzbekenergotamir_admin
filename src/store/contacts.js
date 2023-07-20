import axios from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useContactsStore = defineStore("contacts", {
  state: () => ({ contacts: [], deleteLoading: false, token: JSON.parse(sessionStorage.getItem("admin")).token }),
  actions: {
    getAllContacts: async function () {
      const toast = useToast();
      try {
        const res = await axios.get("/contacts", { headers: { Authorization: "Bearer " + this.token } });
        this.contacts = res.data.contacts;
      } catch (error) {
        toast.error(error.message);
      }
    },
    delContacts: async function (id) {
      const toast = useToast();
      this.deleteLoading = id;
      try {
        await axios.delete(`/contacts/${id}`, { headers: { Authorization: "Bearer " + this.token } });
        this.contacts = this.contacts.filter((partner) => partner._id !== id);
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.deleteLoading = "";
      }
    },
  },
});
