import axios from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useNewsStore = defineStore("news", {
  state: () => ({
    news: [],
    loading: false,
    deleteLoading: false,
    token: JSON.parse(sessionStorage.getItem("admin")).token,
  }),
  actions: {
    getAllNews: async function () {
      const toast = useToast();
      try {
        const res = await axios.get("/news", { headers: { "Accept-language": "ru" } });
        this.news = res.data.news;
      } catch (error) {
        toast.error(error.message);
      }
    },
    addNews: async function (data) {
      const toast = useToast();
      this.loading = true;
      try {
        const res = await axios.post("/news", data, { headers: { Authorization: "Bearer " + this.token } });
        // this.News = res.data.News;
        // this.News.push(res.data.partner.image.secure_url);
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.loading = false;
      }
    },
    delNews: async function (id) {
      const toast = useToast();
      this.deleteLoading = id;
      try {
        await axios.delete(`/news/${id}`, { headers: { Authorization: "Bearer " + this.token } });
        this.news = this.news.filter((el) => {
          return el._id != id;
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.deleteLoading = "";
      }
    },
  },
});
