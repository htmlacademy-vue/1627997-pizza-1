/* eslint-disable prettier/prettier */
//импортируем статику
import miscStore from "@/static/misc.json";
import pizzaStore from "@/static/pizza.json";

//импортируем константы
import {
  PIZZA_SIZES,
  INGREDIENTS_ENG_NAMES,
  SAUCES_ENG_NAMES,
  DOUGH_TYPES,
} from "@/common/constants";

export default {
  namespaced: true,
  state: {
    miscStore,
    pizzaStore,
    PIZZA_SIZES,
    INGREDIENTS_ENG_NAMES,
    SAUCES_ENG_NAMES,
    DOUGH_TYPES,
    pizzas: [],
    products: [],
  },
  getters: {
    isCartEmpty: (state) => !state.pizzas.length,
  },
  mutations: {

  },
  actions: {
    addNewPizzaToCartAction: ({state, commit, rootGetters}, payload) => {
      //добавляем пиццу из конструктора в корзину
      state.pizzas.push({...payload, count: 1});

      //вызываем мутацию из модуля Builder, чтобы в конструкторе выставить исходные параметры пиццы
      commit(
        "Builder/setPizzaRecipeInitial",
        rootGetters['Builder/pizzaRecipeInitial'],
        {root: true});
    },
  },
};
