import axios from "@/plugins/axios";

//импортируем константы
import {
  PIZZA_SIZES,
  INGREDIENTS_ENG_NAMES,
  SAUCES_ENG_NAMES,
  DOUGH_TYPES,
} from "@/common/constants";

//получение данных для конструктора
export class BuilderApiService {
  #resourcesArr;
  constructor(resourcesArr) {
    this.#resourcesArr = resourcesArr;
  }

  //получаем данные для конструктора с бэка
  async getBuilderData() {
    const requests = this.#resourcesArr.map((link) => {
      return axios.get(link);
    });

    const items = await Promise.all(requests);

    return this.getPizzaBuilderComponents(items);
  }

  //расширяем объекты теста, размера, соуса, ингредиентов, чтобы использовать это в компонентах
  getPizzaBuilderComponents(components) {
    const pizzaBuilderDataExtended = {
      //в массиве объектов понять, что за данные можно пройдя путь: obj > config > url, там будет dough, sizes и т.д.
      dough: (
        components.find((el) => el.config.url === "dough").data || []
      ).map((dough, idx) => ({
        ...dough,
        type: "dough",
        value: DOUGH_TYPES[dough.id],
        checked: idx === 0,
      })),
      sauces: (
        components.find((el) => el.config.url === "sauces").data || []
      ).map((sauce, idx) => ({
        ...sauce,
        type: "sauces",
        value: SAUCES_ENG_NAMES[sauce.id],
        checked: idx === 0,
      })),
      sizes: (
        components.find((el) => el.config.url === "sizes").data || []
      ).map((size, idx) => ({
        ...size,
        type: "sizes",
        value: PIZZA_SIZES[size.id],
        checked: idx === 0,
      })),
      ingredients: (
        components.find((el) => el.config.url === "ingredients").data || []
      ).map((ingredient) => ({
        ...ingredient,
        type: "ingredients",
        value: INGREDIENTS_ENG_NAMES[ingredient.id],
        count: 0,
      })),
    };

    return pizzaBuilderDataExtended;
  }
}
