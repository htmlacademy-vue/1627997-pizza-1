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
    pizzaRecipeStore: {
      dough: { ...pizzaStore.dough[0] },
      sizes: { ...pizzaStore.sizes[0] },
      sauces: { ...pizzaStore.sauces[0] },
      ingredients: [],
      pizzaNameStore: "",
    },
  },
  mutations: {
    setPizzaName(state, name) {
      state.pizzaRecipeStore.pizzaNameStore = name;
    },
    //метод изменения размера, теста, соуса пиццы
    setRecipeParam(state, { pizzaParam, id }) {
      state.pizzaRecipeStore[pizzaParam] = {
        ...state.pizzaStore[pizzaParam].find((param) => param.id === +id),
      };
    },
    //метод изменения ингредиентов пиццы
    setRecipeIngredient(state, { pizzaParam, id, count }) {
      //если такой ингредиент уже есть в массиве, просто изменяем счётчик в объекте ингредиента
      //условие, что в массиве ингредиентов не более 3х штук - оставляем контролировать в компоненте ItemCounter, если 3, то кнопки добавления будут неактивны

      const itemIndex = state.pizzaRecipeStore[pizzaParam].findIndex(
        (item) => item.id === id
      );

      if (~itemIndex) {
        const ingredient = state.pizzaRecipeStore[pizzaParam][itemIndex];
        const ingredientNewCount = ingredient.count + count;

        if (ingredientNewCount === 0) {
          state.pizzaRecipeStore[pizzaParam].splice(itemIndex, 1);
        } else {
          ingredient.count = ingredientNewCount;
        }
      } else {
        state.pizzaRecipeStore[pizzaParam].push({
          ...(state.pizzaStore[pizzaParam].filter((ing) => ing.id === id)[0] ||
            []),
          count,
        });
      }
    },
    setPizzaRecipeInitial: (state, payload) => {
      state.pizzaRecipeStore = {...payload};
    },
  },
  getters: {
    getPizzaName: (state) => state.pizzaRecipeStore.pizzaNameStore,
    ingredientsTotalPrice: (state) => {
      return state.pizzaRecipeStore.ingredients.reduce((sum, item) => {
        return sum + (item?.count ?? 1) * item.price;
      }, 0);
    },
    pizzaTotalPrice: (state, getters) => {
      return (
        state.pizzaRecipeStore.sizes.multiplier *
        (state.pizzaRecipeStore.dough.price +
          state.pizzaRecipeStore.sauces.price +
          getters.ingredientsTotalPrice)
      );
    },
    pizzaRecipeInitial: (state) => {
      return ({
        dough: { ...state.pizzaStore.dough[0] },
        sizes: { ...state.pizzaStore.sizes[0] },
        sauces: { ...state.pizzaStore.sauces[0] },
        ingredients: [],
        pizzaNameStore: "купи еще, гад ;)",
      })
    },
  },
  actions: {},
};
