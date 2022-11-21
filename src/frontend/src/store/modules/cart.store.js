/* eslint-disable prettier/prettier */
//импортируем статику
import miscStore from "@/static/misc.json";
import pizzaStore from "@/static/pizza.json";

import { createRandomID } from "@/common/helpers";


export default {
  namespaced: true,
  state: {
    miscStore,
    pizzaStore,
    pizzas: [],
    products: [],
  },
  getters: {
    isCartEmpty: (state) => !state.pizzas.length,
  },
  actions: {
    addNewPizzaToCartAction({commit, rootGetters}){
      commit("addNewPizzaToCart", rootGetters["Builder/pizzaTotalRecipe"])

    },
  },
  mutations: {
    addNewPizzaToCart(state, payload){
       //добавляем payload-пиццу из конструктора в корзину
       state.pizzas.push({...payload, pizzaCount: 1, pizzaID: createRandomID() }); //@TODO - исправить
    }
  },
};
