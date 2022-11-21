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

//импортируем типы мутаций
import {
  SET_SELECTOR_ITEM,
  SET_INGREDIENT_COUNT,
  RESET_BUILDER_PIZZA,
  SET_NAME_PIZZA,
} from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    miscStore,
    pizzaStore,
    PIZZA_SIZES,
    INGREDIENTS_ENG_NAMES,
    SAUCES_ENG_NAMES,
    DOUGH_TYPES,
    pizzaBuilder: {
      //сейчас это просто из json файла, дальше будет получение с сервера
      pizzaID: null,
      pizzaName: "",
      pizzaPrice: null,
      pizzaCount: null,
      dough: [],
      ingredients: [],
      sauces: [],
      sizes: [],
    },
    pizzaBuilderInitial: {},
  },
  mutations: {
    //==============================================================================
    //инициализация основного объекта конструктора
    setPizzaBuilderComponents: (state, payload) => {
      state.pizzaBuilder = { ...payload };
      state.pizzaBuilderInitial = payload;
    },
    //мутация для радиокнопок, в item есть свойство type: [dough, sizes, sauces]
    [SET_SELECTOR_ITEM](state, item) {
      state.pizzaBuilder[item.type] = state.pizzaBuilder[item.type].map(
        (el) => ({
          ...el,
          checked: el.id === item.id,
        })
      );
    },
    //мутация для кол-ва ингредиентов, в item есть свойство type: [dough, sizes, sauces]
    [SET_INGREDIENT_COUNT](state, item) {
      state.pizzaBuilder.ingredients = state.pizzaBuilder.ingredients.map(
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
    //мутация для сброса данных в конструкторе
    [RESET_BUILDER_PIZZA](state) {
      state.pizzaBuilder = { ...state.pizzaBuilderInitial };
    },
    //мутация для изменения названия пиццы
    [SET_NAME_PIZZA](state, name) {
      state.pizzaBuilder.pizzaName = name;
    },
  },
  getters: {
    //==============================================================================
    //получаем выбранные ингредиенты (count > 0)
    ingredientsSelected: (state) => {
      return state.pizzaBuilder.ingredients.filter((el) => {
        return el.count > 0;
      });
    },
    //получаем выбранное тесто (checked === true)
    doughSelected(state) {
      return state.pizzaBuilder.dough.find((el) => el.checked === true);
    },
    //получаем выбранный размер (checked === true)
    sizeSelected(state) {
      return state.pizzaBuilder.sizes.find((el) => el.checked === true);
    },
    //получаем выбранный соус (checked === true)
    sauceSelected(state) {
      return state.pizzaBuilder.sauces.find((el) => el.checked === true);
    },
    //проверяем все условия, чтобы можно было нажать кнопку Готовьте
    pizzaRecipeIsReady(state, { ingredientsSelected }) {
      return ingredientsSelected.length && state.pizzaBuilder.pizzaName.length;
    },
    //считаем итоговую стоимость пиццы
    pizzaTotalCost(
      state,
      { ingredientsSelected, doughSelected, sizeSelected, sauceSelected }
    ) {
      //стоимость ингредиентов
      const ingredientsTotalPrice = ingredientsSelected.reduce((sum, item) => {
        return sum + item.count * item.price;
      }, 0);

      return (
        sizeSelected.multiplier *
        (doughSelected.price + sauceSelected.price + ingredientsTotalPrice)
      );
    },
    //геттер получающий из pizzaBuilder итоговый объект-рецепт с данными пиццы, который мы передадим в корзину
    pizzaTotalRecipe: (
      state,
      {
        ingredientsSelected,
        doughSelected,
        sizeSelected,
        sauceSelected,
        pizzaTotalCost,
      }
    ) => ({
      pizzaID: state.pizzaBuilder.pizzaID,
      pizzaName: state.pizzaBuilder.pizzaName,
      pizzaPrice: pizzaTotalCost,
      pizzaCount: state.pizzaBuilder.pizzaCount,
      dough: doughSelected,
      sauces: sauceSelected,
      sizes: sizeSelected,
      ingredients: ingredientsSelected,
    }),
  },
  actions: {
    //сейчас это просто функция, обрабатывающая данные из json файла, дальше будет получение с сервера
    getPizzaBuilderComponents: ({ state, commit }) => {
      //расширяем объекты теста, размера, соуса, ингредиентов, чтобы использовать это в компонентах
      const pizzaBuilderDataExtended = {
        pizzaID: null,
        pizzaName: "",
        pizzaPrice: null,
        pizzaCount: null,
        dough: state.pizzaStore.dough.map((dough, idx) => ({
          ...dough,
          type: "dough",
          value: DOUGH_TYPES[dough.id],
          checked: idx === 0,
        })),
        sauces: state.pizzaStore.sauces.map((sauce, idx) => ({
          ...sauce,
          type: "sauces",
          value: SAUCES_ENG_NAMES[sauce.id],
          checked: idx === 0,
        })),
        sizes: state.pizzaStore.sizes.map((size, idx) => ({
          ...size,
          type: "sizes",
          value: PIZZA_SIZES[size.id],
          checked: idx === 0,
        })),
        ingredients: state.pizzaStore.ingredients.map((ingredient) => ({
          ...ingredient,
          type: "ingredients",
          value: INGREDIENTS_ENG_NAMES[ingredient.id],
          count: 0,
        })),
      };

      //записываем в стэйт
      commit("setPizzaBuilderComponents", pizzaBuilderDataExtended);
    },
    //действие для Drag-n-Drop
    dropIngredient({ commit }, item) {
      commit(SET_INGREDIENT_COUNT, { ...item, count: 1 });
    },
  },
};
