import Vue from "vue";
import Vuex from "vuex";
import server from "../api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    productList: [],
    carts: [],
    myNotif: "",
    myError: "",
    userLogin: {}
  },
  mutations: {
    SET_LOGIN(state, payload) {
      state.isLogin = payload;
    },
    SET_PRODUCTLIST(state, payload) {
      state.productList = payload;
    },
    SET_CARTS(state, payload) {
      state.carts = payload;
    },
    CHANGE_MYNOTIF(state, payload) {
      state.myNotif = payload;
    },
    CHANGE_MYERROR(state, payload) {
      state.myError = payload;
    },
    CHANGE_USERLOGIN(state, payload) {
      state.userLogin = payload;
    }
  },
  actions: {
    fetchProductList(context) {
      server({
        method: "get",
        url: "/product",
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          context.commit("SET_PRODUCTLIST", response.data.products);
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchCart(context) {
      server({
        method: "get",
        url: "/cart",
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          context.commit("SET_CARTS", response.data.carts);
          console.log(response.data.carts)
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  modules: {}
});
