/* eslint-disable prettier/prettier */
//импортируем статику
import miscStore from "@/static/misc.json";
import pizzaStore from "@/static/pizza.json";

import { createRandomID } from "@/common/helpers";

//импортируем типы мутаций
import {
  SET_PIZZA_COUNT,
} from "@/store/mutation-types";


export default {
  namespaced: true,
  state: {
    miscStore,
    pizzaStore,
    pizzas: [],
    misc: [],
  },
  getters: {
    isCartEmpty: (state) => !state.pizzas.length,
    pizzaPriceByID: state => pizzaID => {
      const pizza = state.pizzas.find( (el) => {
        return el.pizzaID === pizzaID
      });
      return pizza.pizzaPrice * pizza.pizzaCount;
    }
  },
  actions: {
    addNewPizzaToCartAction({commit, rootGetters}){
      commit("addNewPizzaToCart", rootGetters["Builder/pizzaTotalRecipe"])

    },
  },
  mutations: {
    addNewPizzaToCart(state, payload){
          //добавляем payload-пиццу из конструктора в корзину:
          //ищем по pizzaID, если нашлась - заменяем на новый объект, если нет - просто добавляем в корзину

      const pizzaInCartIndex = state.pizzas.findIndex( (el) => el.pizzaID === payload.pizzaID)

      if (~pizzaInCartIndex){
        state.pizzas.splice(pizzaInCartIndex, 1, payload);
      }
      else{
        state.pizzas.push({...payload, pizzaCount: 1, pizzaID: createRandomID() });
      }
      
    },
    //мутация для изменения кол-ва пиццы в корзине
    [SET_PIZZA_COUNT](state, item) {
      const newPizzaCount = item.pizzaCount + item.count;

      //если получается 0, то пиццу надо удалить из корзины, иначе - изменить счётчик
      if (newPizzaCount === 0){
        state.pizzas = state.pizzas.filter( (el) => el.pizzaID !== item.pizzaID);
      }
      else{
        state.pizzas = state.pizzas.map( (el) => {
          if (el.pizzaID !== item.pizzaID){
            return el;
          }
          else{
            return {
              ...el,
              pizzaCount: newPizzaCount
            }
          }
        })
      }
    },
  },
};
