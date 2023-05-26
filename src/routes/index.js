import { createRouter, createWebHistory } from "vue-router";
import { admin } from "../store/admin";
import Home from "../view/HomeView.vue";
import Login from "../view/LoginView.vue";
import Services from "../view/service/Services.vue";
import ServiceAdd from "../view/service/AddService.vue";
import ServiceEdit from "../view/service/EditService.vue";
import products from "../view/products/Products.vue";
import ProductAdd from "../view/products/ProductsAdd.vue";
import ProductEdit from "../view/products/ProductsEdit.vue";
import Category from "../view/CategoryView.vue";
import Configuration from "../view/ConfigurationView.vue";
import Order from "../view/OrderView.vue";
import Slider from "../view/SliderView.vue";
import HomeText from "../view/HomeTextView.vue";
import About from "../view/AboutView.vue";
import AddUser from "../view/AddUserView.vue";

import Calculate from "../view/calculates/Calculate.vue";
import CalculateAdd from "../view/calculates/CalculateAdd.vue";
import CalculateEdit from "../view/calculates/CalculateEdit.vue";

import Partner from "../view/partners/Partners.vue";
import PartnerAdd from "../view/partners/Partners_add.vue";
import PartnerEdit from "../view/partners/Partners_edit.vue";

import Contacts from "../view/contacts/Contacts.vue";
import ContactsEdit from "../view/contacts/Contacts_edit.vue";
import ContactsAdd from "../view/contacts/Contacts_add.vue";

import EnergyProduct from "../view/energyProducts/EnergyProducts.vue";
import EnergyProductAdd from "../view/energyProducts/EnergyProducts_add.vue";
import EnergyProductEdit from "../view/energyProducts/EnergyProducts_edit.vue";

import LocalProducts from "../view/localProducts/LocalProducts.vue";
import LocalProductsAdd from "../view/localProducts/LocalProducts_add.vue";
import LocalProductsEdit from "../view/localProducts/LocalProducts_edit.vue";

import News from "../view/news/News.vue";
import NewsAdd from "../view/news/News_add.vue";
import NewsEdit from "../view/news/News_edit.vue";

const routes = [
  { path: "/", name: "home", component: Home, meta: { auth: true } },
  { path: "/users/add", name: "users_add", component: AddUser, meta: { auth: true } },
  { path: "/login", name: "login", component: Login, meta: { auth: false, layout: "login" } },

  { path: "/calculates", name: "calculates", component: Calculate, meta: { auth: true } },
  { path: "/calculates/add", name: "calculates_add", component: CalculateAdd, meta: { auth: true } },
  { path: "/calculates/edit", name: "calculates_edit", component: CalculateEdit, meta: { auth: true } },

  { path: "/partners", name: "partners", component: Partner, meta: { auth: true } },
  { path: "/partners/add", name: "partners_add", component: PartnerAdd, meta: { auth: true } },
  { path: "/partners/edit", name: "partners_edit", component: PartnerEdit, meta: { auth: true } },

  { path: "/contacts", name: "contacts", component: Contacts, meta: { auth: true } },
  { path: "/contacts/add", name: "contacts_add", component: ContactsAdd, meta: { auth: true } },
  { path: "/contacts/edit", name: "contacts_edit", component: ContactsEdit, meta: { auth: true } },

  { path: "/energyProducts", name: "energyProducts", component: EnergyProduct, meta: { auth: true } },
  { path: "/energyProducts/add", name: "energyProducts_add", component: EnergyProductAdd, meta: { auth: true } },
  { path: "/energyProducts/edit", name: "energyProducts_edit", component: EnergyProductEdit, meta: { auth: true } },

  { path: "/localProducts", name: "localProducts", component: LocalProducts, meta: { auth: true } },
  { path: "/localProducts/add", name: "localProducts_add", component: LocalProductsAdd, meta: { auth: true } },
  { path: "/localProducts/edit", name: "localProducts_edit", component: LocalProductsEdit, meta: { auth: true } },

  { path: "/news", name: "news", component: News, meta: { auth: true } },
  { path: "/news/add", name: "news_add", component: NewsAdd, meta: { auth: true } },
  { path: "/news/edit", name: "news_edit", component: NewsEdit, meta: { auth: true } },

  { path: "/services", name: "service", component: Services, meta: { auth: true } },
  { path: "/service_add", name: "ServiceAdd", component: ServiceAdd, meta: { auth: true } },
  { path: "/service/:id", name: "ServiceEdit", component: ServiceEdit, meta: { auth: true } },
  { path: "/products", name: "Products", component: products, meta: { auth: true } },
  { path: "/products/:id", name: "ProductsEdit", component: ProductEdit, meta: { auth: true } },
  { path: "/product_add", name: "ProductAdd", component: ProductAdd, meta: { auth: true } },
  { path: "/categories", name: "Category", component: Category, meta: { auth: true } },
  { path: "/configuration", name: "Configuration", component: Configuration, meta: { auth: true } },
  { path: "/order", name: "Order", component: Order, meta: { auth: true } },
  { path: "/slider", name: "Slider", component: Slider, meta: { auth: true } },
  { path: "/home", name: "HomeText", component: HomeText, meta: { auth: true } },
  { path: "/about", name: "About", component: About, meta: { auth: true } },
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
