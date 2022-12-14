/* eslint-disable prettier/prettier */
//импортируем статику
import miscStore from "@/static/misc.json";
import pizzaStore from "@/static/pizza.json";

import { createRandomID } from "@/common/helpers";

//импортируем типы мутаций
import { SET_PIZZA_COUNT, SET_MISC_COUNT,CLEAR_CART } from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    miscStore,
    pizzaStore,
    pizzas: [],
    misc: [],
    miscInitial: [],
  },
  getters: {
    isCartEmpty: (state) => !state.pizzas.length,
    pizzaPriceByID: (state) => (pizzaID) => {
      const pizza = state.pizzas.find((el) => {
        return el.pizzaID === pizzaID;
      });
      return pizza.pizzaPrice * pizza.pizzaCount;
    },
    cartTotalCost: (state) => {
      const pizzasTotalCost = state.pizzas.reduce( (sum, item) => {
        return sum + item.pizzaCount * item.pizzaPrice
      }, 0);

      const miscTotalCost = state.misc.reduce( (sum, item) => {
        return sum + item.count * item.price
      }, 0);

      return pizzasTotalCost + miscTotalCost;
    },
    miscProductsDataExtended: (state) => {
      //расширяем объекты доп продуктов
      const miscProductsDataExtended = state.miscStore
        .map((el) => ({
          ...el,
          count: 0,
      }));
      
      return miscProductsDataExtended;
    }
  },
  actions: {
    addNewPizzaToCartAction({ commit, rootGetters }) {
      commit("addNewPizzaToCart", rootGetters["Builder/pizzaTotalRecipe"]);
    },
    //сейчас это просто функция, обрабатывающая данные из json файла, дальше будет получение с сервера
    getMiscProducts: ({ commit, getters }) => {
      //расширяем объекты доп продуктов
      const miscProductsDataExtended = getters.miscProductsDataExtended;

      //записываем в стэйт
      commit("setMiscProducts", miscProductsDataExtended);
      commit("setMiscProductsInitial", miscProductsDataExtended);
    },
  },
  mutations: {
    addNewPizzaToCart(state, payload) {
      //добавляем payload-пиццу из конструктора в корзину:
      //ищем по pizzaID, если нашлась - заменяем на новый объект, если нет - просто добавляем в корзину

      const pizzaInCartIndex = state.pizzas.findIndex(
        (el) => el.pizzaID === payload.pizzaID
      );

      if (~pizzaInCartIndex) {
        state.pizzas.splice(pizzaInCartIndex, 1, payload);
      } else {
        state.pizzas.push({
          ...payload,
          pizzaCount: 1,
          pizzaID: createRandomID(),
        });
      }
    },
    //мутация для изменения кол-ва пиццы в корзине
    [SET_PIZZA_COUNT](state, item) {
      const newPizzaCount = item.pizzaCount + item.count;

      //если получается 0, то пиццу надо удалить из корзины, иначе - изменить счётчик
      if (newPizzaCount === 0) {
        state.pizzas = state.pizzas.filter((el) => el.pizzaID !== item.pizzaID);
      } else {
        state.pizzas = state.pizzas.map((el) => {
          if (el.pizzaID !== item.pizzaID) {
            return el;
          } else {
            return {
              ...el,
              pizzaCount: newPizzaCount,
            };
          }
        });
      }
    },
    //мутация для установки дополнительных продуктов
    setMiscProducts: (state, payload) => {
      state.misc = [...payload];
    },
    setMiscProductsInitial: (state, payload) => {
      state.miscInitial = [...payload];
    },
    [CLEAR_CART](state) {
      state.pizzas = [];
      state.misc = [...state.miscInitial];
    },
    //мутация для кол-ва дополнительных продуктов
    [SET_MISC_COUNT](state, item) {
      state.misc = state.misc.map(
        (el) => {
          if (el.id !== item.id) {
            return el;
          } else {
            const count = el.count + item.count;

            return {
              ...el,
              count,
            };
          }
        }
      );
    },
  },
};
