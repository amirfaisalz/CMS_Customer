import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Missing from "../components/Missing.vue";
import Dashboard from "../views/Dashboard.vue";

import ProductDetail from "../components/ProductDetail.vue";
import Cart from "../components/Cart.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "detail",
        name: "ProductDetail",
        component: ProductDetail
      },
      {
        path: "cart",
        name: "Cart",
        component: Cart
      }
    ]
  },
  {
    path: "*",
    component: Missing
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
