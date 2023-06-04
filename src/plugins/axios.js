import axios from "axios";
import { admin } from "/src/store/admin";

export default function () {
  const store = admin();
  axios.defaults.baseURL = "https://goldfish-app-bslmb.ondigitalocean.app/api/v1";
  axios.defaults.headers.common["Authorization"] = `Bearer ${store.token}`;
}
