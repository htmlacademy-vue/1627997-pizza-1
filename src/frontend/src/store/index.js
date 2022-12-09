import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";

Vue.use(Vuex);

const state = () => ({
  someStateField: [],
});

const actions = {
  async init({ dispatch }) {
    dispatch("Builder/getPizzaBuilderComponents");
    dispatch("Cart/getMiscProducts");

    //неавторизован
    // dispatch("Auth/setUserNonAuth");

    //авторизован
    dispatch("Auth/getUser");

    //получаем адреса
    dispatch("Addresses/getAddresses");
  },
};

export default new Vuex.Store({
  state,
  getters: {},
  mutations: {},
  actions,
  modules,
});
