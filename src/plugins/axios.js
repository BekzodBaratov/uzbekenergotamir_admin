import axios from "axios";
import { admin } from "/src/store/admin";

export default function () {
  const store = admin();
  axios.defaults.baseURL = "http://134.209.75.85:3000/api/v1";
  axios.defaults.headers.common["Authorization"] = `Bearer ${store.token}`;
}
