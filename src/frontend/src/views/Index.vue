<template>
  <div>
    <AppLayout />

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector
            :pizza="pizza"
            :pizza-recipe="pizzaRecipe"
            @pizza-param-changed="changeRecipe"
          />

          <BuilderSizeSelector
            :pizza="pizza"
            :pizza-recipe="pizzaRecipe"
            @pizza-param-changed="changeRecipe"
          />

          <BuilderIngredientsSelector
            :pizza="pizza"
            :pizza-recipe="pizzaRecipe"
            @pizza-param-changed="changeRecipe"
          />

          <BuilderPizzaView
            :pizza="pizza"
            :pizza-recipe="pizzaRecipe"
            v-model="pizzaName"
          />
        </div>
      </form>
    </main>
  </div>
</template>

<script>
//импортируем статику
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";
import AppLayout from "@/layouts/AppLayout";

//импортируем константы
import {
  PIZZA_SIZES,
  INGREDIENTS_ENG_NAMES,
  SAUCES_ENG_NAMES,
  DOUGH_TYPES,
} from "@/common/constants";

//импортируем компоненты
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

export default {
  name: "IndexMain",
  data() {
    return {
      misc,
      pizza,
      user,
      PIZZA_SIZES,
      INGREDIENTS_ENG_NAMES,
      SAUCES_ENG_NAMES,
      DOUGH_TYPES,
      pizzaRecipe: {
        dough: { ...pizza.dough[0] },
        sizes: { ...pizza.sizes[0] },
        sauces: { ...pizza.sauces[0] },
        ingredients: [],
      },
      pizzaName: "",
    };
  },
  components: {
    AppLayout,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  methods: {
    //метод изменения рецепта пиццы, собираемой в конструкторе
    changeRecipe(obj) {
      //если это ингредиенты, то у нас в аргументе есть ещё count

      if (obj.pizzaParam === "ingredients") {
        this.setRecipeIngredient(obj);
      } else {
        this.setRecipeParam(obj);
      }
    },
    //метод изменения размера, теста, соуса пиццы
    setRecipeParam({ pizzaParam, id }) {
      this.pizzaRecipe[pizzaParam] = {
        ...this.pizza[pizzaParam].find((param) => param.id === +id),
      };
    },
    //метод изменения ингредиентов пиццы
    setRecipeIngredient({ pizzaParam, id, count }) {
      //если такой ингредиент уже есть в массиве, просто изменяем счётчик в объекте ингредиента
      //условие, что в массиве ингредиентов не более 3х штук - оставляем контролировать в компоненте ItemCounter, если 3, то кнопки добавления будут неактивны

      const itemIndex = this.pizzaRecipe[pizzaParam].findIndex(
        (item) => item.id === id
      );

      if (~itemIndex) {
        const ingredient = this.pizzaRecipe[pizzaParam][itemIndex];
        const ingredientNewCount = ingredient.count + count;

        if (ingredientNewCount === 0) {
          this.pizzaRecipe[pizzaParam].splice(itemIndex, 1);
        } else {
          ingredient.count = ingredientNewCount;
        }
      } else {
        this.pizzaRecipe[pizzaParam].push({
          ...(this.pizza[pizzaParam].filter((ing) => ing.id === id)[0] || []),
          count,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dummy-selector {
  border: 1px;
}
</style>
