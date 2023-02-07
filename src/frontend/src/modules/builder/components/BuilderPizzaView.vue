<template>
  <AppDrop @drop="drop">
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
            <transition-group name="ingredient">
              <div
                v-for="ingredient in ingredientsSelected"
                :key="ingredient.id"
                :class="[
                  `pizza__filling--${ingredient.value}`,
                  {
                    'pizza__filling--second': ingredient.count === 2,
                    'pizza__filling--third': ingredient.count === 3,
                  },
                ]"
                class="pizza__filling"
              ></div>
            </transition-group>
          </div>
        </div>
      </div>

      <div class="content__result">
        <BuilderPriceCounter />
        <button
          type="button"
          class="button"
          :disabled="!pizzaRecipeIsReady"
          @click="addToCartAndResetBuilder"
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
import { SET_NAME_PIZZA, RESET_BUILDER_PIZZA } from "@/store/mutation-types";

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
    ...mapState("Builder", {
      pizzaBuilder: "pizzaBuilder",
    }),
    ...mapGetters("Builder", [
      "pizzaRecipeIsReady",
      "ingredientsSelected",
      "doughSelected",
      "sizeSelected",
      "sauceSelected",
    ]),
    pizzaName: {
      //сделал, как в документации для v-model двунаправленное вычисляемое свойство
      get() {
        return this.pizzaBuilder.pizzaName;
      },
      set(value) {
        this.setPizzaName(value);
      },
    },

    //вычисляем css классы для теста и соуса
    doughClass() {
      //тут в ТЗ разные английские названия классов, в BuilderDoughSelector модификатор --light\large, а здесь --big\small
      return this.doughSelected.value === "light" ? "small" : "big";
    },
    sauceClass() {
      return this.sauceSelected.value;
    },
    doughSauceResultClass() {
      return `pizza--foundation--${this.doughClass}-${this.sauceClass}`;
    },
    cookButtonIsDisabled() {
      return !this.pizzaName.length || !this.pizzaRecipe.ingredients.length;
    },
  },
  methods: {
    //новое действие для Drag-n-Drop
    ...mapActions("Builder", {
      drop: "dropIngredient",
    }),
    //новая мутация - устанока имени пиццы
    ...mapMutations("Builder", {
      setPizzaName: SET_NAME_PIZZA,
      resetPizzaBuilder: RESET_BUILDER_PIZZA,
    }),
    //новое действие для добавления в корзину
    ...mapActions("Cart", ["addNewPizzaToCartAction"]),
    //метод, который вызовет 2 экшена: добавление в корзину + сброс конструктора
    addToCartAndResetBuilder() {
      this.addNewPizzaToCartAction();
      this.resetPizzaBuilder();
    },
  },
};
</script>

<style>
.ingredient-enter-active,
.ingredient-leave-active {
  transition: opacity 0.5s;
}

.ingredient-enter,
.ingredient-leave-to {
  opacity: 0;
}
</style>
