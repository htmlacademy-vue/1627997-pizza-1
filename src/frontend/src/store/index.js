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
  },
};

export default new Vuex.Store({
  state,
  getters: {},
  mutations: {},
  actions,
  modules,
});
