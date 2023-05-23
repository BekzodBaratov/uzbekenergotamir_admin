import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import "./plugins/axios";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import axiosConfig from "./plugins/axios";

import App from "./App.vue";
import router from "./routes";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(createPersistedState({ storage: sessionStorage }));

app.use(pinia);
app.use(router);
app.use(Toast);

axiosConfig();

app.mount("#app");
