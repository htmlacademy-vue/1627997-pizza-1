import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import vuexPlugins from "@/plugins/vuexPlugins";
import { setAuth } from "@/common/helpers";

Vue.use(Vuex);

const state = () => ({
  someStateField: [],
});

const actions = {
  async init({ dispatch }) {
    //проверяем токен и: устанавливаем заголовки запросов + получаем данные авторизованного пользователя
    if (this.$jwt.getToken()) {
      setAuth(this);
    }
    //данные для конструктора с бэка
    dispatch("Builder/getPizzaBuilderComponents");
    dispatch("Cart/getMiscProducts");
  },
};

export default new Vuex.Store({
  state,
  getters: {},
  mutations: {},
  actions,
  modules,
  plugins: [vuexPlugins],
});
