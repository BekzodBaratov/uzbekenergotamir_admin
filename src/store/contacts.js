import axios from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useContactsStore = defineStore("contacts", {
  state: () => ({ contacts: [] }),
  actions: {
    getAllContacts: async function () {
      const toast = useToast();
      try {
        const res = await axios.get("/contacts");
        this.contacts = res.data.contacts;
      } catch (error) {
        toast.error(error.message);
      }
    },
    delContacts: async function (id) {
      const toast = useToast();
      try {
        await axios.delete(`/contacts/${id}`);
        this.contacts = this.contacts.filter((partner) => partner._id !== id);
      } catch (error) {
        toast.error(error.message);
      }
    },
  },
});
