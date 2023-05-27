import axios from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useNewsStore = defineStore("news", {
  state: () => ({ news: [] }),
  actions: {
    getAllNews: async function () {
      const toast = useToast();
      try {
        const res = await axios.get("/news", { headers: { "Accept-language": "ru" } });
        this.news = res.data.news;
        console.log(this.news);
      } catch (error) {
        toast.error(error.message);
      }
    },
    addNews: async function (data) {
      const toast = useToast();
      try {
        console.log(data);
        const res = await axios.post("/news", data);
        // this.News = res.data.News;
        // this.News.push(res.data.partner.image.secure_url);
        console.log(res);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
    delNews: async function (id) {
      const toast = useToast();
      try {
        await axios.delete(`/news/${id}`);
        this.News = this.news.filter((el) => el._id !== id);
      } catch (error) {
        toast.error(error.message);
      }
    },
  },
});
