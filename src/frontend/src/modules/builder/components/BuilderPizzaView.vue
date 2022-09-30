<template>
  <AppDrop @drop="changeIngredientCount">
    <div class="content__pizza">
      <label class="input">
        <span class="visually-hidden">Название пиццы2</span>
        <input
          type="text"
          name="pizza_name"
          placeholder="Введите название пиццы"
          :value="value"
          @input="$emit('input', $event.target.value)"
        />
      </label>

      <div class="content__constructor">
        <div class="pizza" :class="doughSauceResultClass">
          <div class="pizza__wrapper">
            <div
              v-for="ingredient in pizzaRecipe.ingredients"
              :key="ingredient.id"
              :class="[
                `pizza__filling--${INGREDIENTS_ENG_NAMES[ingredient.id]}`,
                {
                  'pizza__filling--second': ingredient.count === 2,
                  'pizza__filling--third': ingredient.count === 3,
                },
              ]"
              class="pizza__filling"
            ></div>
          </div>
        </div>
      </div>

      <div class="content__result">
        <BuilderPriceCounter :pizza="pizza" :pizza-recipe="pizzaRecipe" />
        <button type="button" class="button" :disabled="cookButtonIsDisabled">
          Готовьте!
        </button>
      </div>
    </div>
  </AppDrop>
</template>

<script>
//импортируем константы
import {
  PIZZA_SIZES,
  INGREDIENTS_ENG_NAMES,
  SAUCES_ENG_NAMES,
  DOUGH_TYPES,
} from "@/common/constants";

import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import AppDrop from "@/common/components/AppDrop";

export default {
  name: "BuilderPizzaView",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
    pizzaRecipe: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      PIZZA_SIZES,
      INGREDIENTS_ENG_NAMES,
      SAUCES_ENG_NAMES,
      DOUGH_TYPES,
    };
  },
  components: {
    BuilderPriceCounter,
    AppDrop,
  },
  computed: {
    //вычисляем css классы для теста и соуса
    doughClass() {
      //тут в ТЗ разные английские названия классов, в BuilderDoughSelector модификатор --light\large, а здесь --big\small
      return this.pizzaRecipe.dough.id === 1 ? "small" : "big";
    },
    sauceClass() {
      return this.SAUCES_ENG_NAMES[this.pizzaRecipe.sauces.id];
    },
    doughSauceResultClass() {
      return `pizza--foundation--${this.doughClass}-${this.sauceClass}`;
    },
    cookButtonIsDisabled() {
      return !this.value.length || !this.pizzaRecipe.ingredients.length;
    },
  },
  methods: {
    changeIngredientCount({ id }) {
      this.$emit("pizza-param-changed", {
        pizzaParam: "ingredients",
        id,
        count: 1,
      });
    },
  },
};
</script>
