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
      //console.log("INTO LOGIN ACTION, context", context);

      //отправляем логин и пароль
      const data = await this.$api.auth.login(credentials);
      //console.log("await this.$api.auth.login(credentials);", data)

      //сохраняем токен
      this.$jwt.saveToken(data.token);

      //устанавливаем заголовки запросов и получаем данные авторизованного пользователя
      setAuth(this);
    },
    //разлогиниваемся
    async logout({ commit }, sendRequest = true) {
      //console.log("INTO LOGOUT ACTION");

      if (sendRequest) {
        await this.$api.auth.logout();
      }

      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();

      commit(LOGOUT_USER);
    },
    //получаем данные авторизованного пользователя
    async getMe({ commit, dispatch }) {
      //console.log("INTO getMe ACTION");
      try {
        const user = await this.$api.auth.getMe();
        //console.log('user store from getMe', user);

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
