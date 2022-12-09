//импортируем статику
import userStore from "@/static/user.json";

export default {
  namespaced: true,
  state: {
    user: {},
    userInitial: {
      id: null,
      name: null,
      email: null,
      avatar: null,
      phone: null,
      password: null,
    },
    userStore,
  },
  getters: {
    isAuth(state) {
      return state.user.id !== null;
    },
  },
  mutations: {
    //пока не реализован модуль авторизации и не было работы с бэкендом, имитируем авторизованного и неавторизованного пользователя
    setUser(state, user) {
      state.user = { ...user };
    },
  },
  actions: {
    setUserNonAuth({ state, commit }) {
      const user = { ...state.userInitial };

      commit("setUser", user);
    },
    //сейчас сюда просто кладём объект user из статического json файла, далее это будет получение по api
    getUser({ state, commit }) {
      const user = { ...state.userStore };

      commit("setUser", user);
    },
  },
};
