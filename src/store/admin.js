import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";

export const admin = defineStore("admin", {
  state: () => ({ token: "", users: [], role: "admin" }),
  getters: { isRegisteration: ({ token }) => token !== "" },
  actions: {
    async getAllUsers() {
      const toast = useToast();
      try {
        const res = await axios.get("/users", { headers: { Authorization: "Bearer " + this.token } });
        this.users = res.data.users;
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    async loginUser(data) {
      const toast = useToast();
      const { email, password } = data;
      try {
        const res = await axios.post("/login", { email, password });
        this.role = res.data.user.role;
        return (this.token = res.data.token);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    async delUser(id) {
      const toast = useToast();
      try {
        const res = await axios.delete(`/users/${id}`);
        this.users = this.users.filter((user) => user._id !== res.data.user._id);
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    async addUser(data) {
      const toast = useToast();
      await new Promise(async (resolve, reject) => {
        try {
          const res = await axios.post(`/users`, data);
          resolve(res.data);
          toast.success(res.data.message);
        } catch (error) {
          reject(error.response.data.message);
          toast.error(error.response.data.message);
        }
      });
    },
  },
  persist: true,
});
