/* eslint-disable prettier/prettier */
import { createRandomID } from "@/common/helpers";

//импортируем типы мутаций
import {
  SET_PIZZA_COUNT,
  SET_MISC_COUNT,
  CLEAR_CART,
} from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
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
      const pizzasTotalCost = state.pizzas.reduce((sum, item) => {
        return sum + item.pizzaCount * item.pizzaPrice;
      }, 0);

      const miscTotalCost = state.misc.reduce((sum, item) => {
        return sum + item.count * item.price;
      }, 0);

      return pizzasTotalCost + miscTotalCost;
    },
    pizzasForOrderNormalized: (state) => {
      return state.pizzas.map((p) => {
        return {
          name: p.pizzaName,
          sauceId: p.sauces.id,
          doughId: p.dough.id,
          sizeId: p.sizes.id,
          quantity: p.pizzaCount,
          ingredients: p.ingredients.map((i) => {
            return {
              ingredientId: i.id,
              quantity: i.count,
            };
          }),
        };
      });
    },
    miscForOrderNormalized: (state) => {
      return state.misc
        .filter((m) => m.count !== 0)
        .map((el) => {
          return {
            miscId: el.id,
            quantity: el.count,
          };
        });
    },
  },
  actions: {
    addNewPizzaToCartAction({ commit, rootGetters }) {
      commit("addNewPizzaToCart", rootGetters["Builder/pizzaTotalRecipe"]);
    },
    //получаем доп товары с бэка
    async getMiscProducts({ commit }) {
      const data = await this.$api.misc.query();

      //расширяем объекты доп продуктов
      const miscProductsDataExtended = data.map((el) => ({
        ...el,
        count: 0,
      }));

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
      state.misc = state.misc.map((el) => {
        if (el.id !== item.id) {
          return el;
        } else {
          const count = el.count + item.count;

          return {
            ...el,
            count,
          };
        }
      });
    },
  },
};
