<template>
  <AppDrop @drop="changeIngredientCount">
    <div class="content__pizza">
      <label class="input">
        <span class="visually-hidden">Название пиццы2</span>
        <input
          type="text"
          name="pizza_name"
          placeholder="Введите название пиццы"
          v-model="pizzaName"
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
        <BuilderPriceCounter />
        <button
          type="button"
          class="button"
          :disabled="cookButtonIsDisabled"
          @click="addNewPizzaToCartAction(pizzaRecipe)"
        >
          Готовьте!
        </button>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import AppDrop from "@/common/components/AppDrop";

import { mapGetters, mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "BuilderPizzaView",
  data() {
    return {};
  },
  components: {
    BuilderPriceCounter,
    AppDrop,
  },
  computed: {
    ...mapGetters("Builder", ["pizzaRecipeInitial"]),
    ...mapState("Builder", {
      PIZZA_SIZES: "PIZZA_SIZES",
      INGREDIENTS_ENG_NAMES: "INGREDIENTS_ENG_NAMES",
      SAUCES_ENG_NAMES: "SAUCES_ENG_NAMES",
      DOUGH_TYPES: "DOUGH_TYPES",
      pizza: "pizzaStore",
      pizzaRecipe: "pizzaRecipeStore",
    }),
    pizzaName: {
      //сделал, как в документации для v-model двунаправленное вычисляемое свойство
      get() {
        //return this.$store.state.Builder.pizzaNameStore;
        return this.$store.getters["Builder/getPizzaName"];
      },
      set(value) {
        this.$store.commit("Builder/setPizzaName", value);
      },
    },

    //вычисляем css классы для теста и соуса
    //UPD: оставил эти вычисляемые свойства в компоненте, т.к. считаю, что они должны быть локальными
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
      return !this.pizzaName.length || !this.pizzaRecipe.ingredients.length;
    },
  },
  methods: {
    ...mapMutations("Builder", [
      "setRecipeParam",
      "setRecipeIngredient",
      "setPizzaRecipeInitial",
    ]),
    ...mapActions("Cart", ["addNewPizzaToCartAction"]),
    changeIngredientCount({ id }) {
      this.setRecipeIngredient({
        pizzaParam: "ingredients",
        id,
        count: 1,
      });
    },
  },
};
</script>
