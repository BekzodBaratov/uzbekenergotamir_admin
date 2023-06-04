import { createRouter, createWebHistory } from "vue-router";
import { admin } from "../store/admin";
import Home from "../view/HomeView.vue";
import Login from "../view/LoginView.vue";
import AddUser from "../view/AddUserView.vue";
import Calculate from "../view/calculates/Calculate.vue";
import Partner from "../view/partners/Partners.vue";
import PartnerAdd from "../view/partners/Partners_add.vue";
import Contacts from "../view/contacts/Contacts.vue";
import EnergyProduct from "../view/energyProducts/EnergyProducts.vue";
import EnergyProductAdd from "../view/energyProducts/EnergyProducts_add.vue";
import LocalProducts from "../view/localProducts/LocalProducts.vue";
import LocalProductsAdd from "../view/localProducts/LocalProducts_add.vue";
import News from "../view/news/News.vue";
import NewsAdd from "../view/news/News_add.vue";

const routes = [
  { path: "/", name: "home", component: Home, meta: { auth: true } },
  { path: "/users/add", name: "users_add", component: AddUser, meta: { auth: true } },
  { path: "/login", name: "login", component: Login, meta: { auth: false, layout: "login" } },
  { path: "/calculates", name: "calculates", component: Calculate, meta: { auth: true } },
  { path: "/partners", name: "partners", component: Partner, meta: { auth: true } },
  { path: "/partners/add", name: "partners_add", component: PartnerAdd, meta: { auth: true } },
  { path: "/contacts", name: "contacts", component: Contacts, meta: { auth: true } },
  { path: "/energyProducts", name: "energyProducts", component: EnergyProduct, meta: { auth: true } },
  { path: "/energyProducts/add", name: "energyProducts_add", component: EnergyProductAdd, meta: { auth: true } },
  { path: "/localProducts", name: "localProducts", component: LocalProducts, meta: { auth: true } },
  { path: "/localProducts/add", name: "localProducts_add", component: LocalProductsAdd, meta: { auth: true } },
  { path: "/news", name: "news", component: News, meta: { auth: true } },
  { path: "/news/add", name: "news_add", component: NewsAdd, meta: { auth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});

router.beforeEach((to, from, next) => {
  const store = admin();
  if ("auth" in to.meta && to.meta.auth && !store.isRegisteration) {
    console.log(store.token);
    next("/login");
  } else if ("auth" in to.meta && !to.meta.auth && store.isRegisteration) {
    next("/");
  }
  next();
});

export default router;
