/* eslint-disable prettier/prettier */
//импортируем статику
import miscStore from "@/static/misc.json";

//импортируем типы мутаций
import {
  SET_SELECTOR_ITEM,
  SET_INGREDIENT_COUNT,
  RESET_BUILDER_PIZZA,
  SET_NAME_PIZZA,
  CHANGE_PIZZA,
} from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    miscStore,
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
      state.pizzaBuilder = { ...state.pizzaBuilder, ...payload };
      state.pizzaBuilderInitial = { ...payload };
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
      state.pizzaBuilder = {
        ...state.pizzaBuilderInitial,
        pizzaID: null,
        pizzaName: "",
        pizzaPrice: null,
        pizzaCount: null,
      };
    },
    //мутация для изменения названия пиццы
    [SET_NAME_PIZZA](state, name) {
      state.pizzaBuilder.pizzaName = name;
    },
    //мутация для изменения пиццы из корзины в конструкторе
    [CHANGE_PIZZA](state, item) {
      //console.log(state, item);

      const pizzaBuilderInitial = { ...state.pizzaBuilderInitial };

      state.pizzaBuilder.dough = pizzaBuilderInitial.dough.map((el) => ({
        ...el,
        checked: el.id === item.dough.id,
      }));

      state.pizzaBuilder.sauces = pizzaBuilderInitial.sauces.map((el) => ({
        ...el,
        checked: el.id === item.sauces.id,
      }));

      state.pizzaBuilder.sizes = pizzaBuilderInitial.sizes.map((el) => ({
        ...el,
        checked: el.id === item.sizes.id,
      }));

      state.pizzaBuilder.ingredients = pizzaBuilderInitial.ingredients.map(
        (el) => {
          //ищем ингредиент в объекте пиццы, пришедшем из корзины
          //если нашли - присваиваем новый count

          const ingredientInPizza = item.ingredients.find(
            (ing) => ing.id === el.id
          );

          const newCount = ingredientInPizza
            ? ingredientInPizza.count
            : el.count;

          return {
            ...el,
            count: newCount,
          };
        }
      );

      state.pizzaBuilder.pizzaID = item.pizzaID;
      state.pizzaBuilder.pizzaName = item.pizzaName;
      state.pizzaBuilder.pizzaPrice = item.pizzaPrice;
      state.pizzaBuilder.pizzaCount = item.pizzaCount;
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
    //функция получения элементов конструктора с бэка
    async getPizzaBuilderComponents({ commit }) {
      const pizzaBuilderDataExtended = await this.$api.builder.getBuilderData();
      // console.log(pizzaBuilderDataExtended);

      //записываем в стэйт
      commit("setPizzaBuilderComponents", pizzaBuilderDataExtended);
    },
    //действие для Drag-n-Drop
    dropIngredient({ commit }, item) {
      commit(SET_INGREDIENT_COUNT, { ...item, count: 1 });
    },
  },
};
