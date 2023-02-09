/* eslint-disable prettier/prettier */
import { setAuth } from "@/common/helpers";
import { LOGOUT_USER } from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    user: {},
    userInitial: {},
  },

  actions: {
    //логинимся
    async login(context, credentials) {
      //отправляем логин и пароль
      const data = await this.$api.auth.login(credentials);

      //сохраняем токен
      this.$jwt.saveToken(data.token);

      //устанавливаем заголовки запросов и получаем данные авторизованного пользователя
      setAuth(this);
    },
    //разлогиниваемся
    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }

      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();

      commit(LOGOUT_USER);
    },
    //получаем данные авторизованного пользователя
    async getMe({ commit, dispatch }) {
      try {
        const user = await this.$api.auth.getMe();

        commit("setUser", user);
      } catch {
        dispatch("logout", false);
      }
    },
  },

  getters: {
    isAuth(state) {
      return state.user?.id !== undefined;
    },
  },
  
  mutations: {
    //установка данных пользователя в стейт
    setUser(state, user) {
      state.user = { ...user };
    },
    [LOGOUT_USER](state) {
      const user = { ...state.userInitial };
      state.user = user;
    },
  },
};
