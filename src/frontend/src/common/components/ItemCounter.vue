<!-- eslint-disable prettier/prettier -->
<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="$emit('change-ingredient-count', { id: ingredientId, count: -1 })"
      :disabled="buttonMinusIsDisabled"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="itemCounterCurrentValue"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="$emit('change-ingredient-count', { id: ingredientId, count: 1 })"
      :disabled="buttonPlusIsDisabled"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ItemCounter",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    ingredientId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("Builder", {
      pizzaRecipe: "pizzaRecipeStore",
    }),
    buttonPlusIsDisabled() {
      return (
        this.pizzaRecipe.ingredients.filter(
          (ing) => ing.id === this.ingredientId
        )[0]?.count === 3
      );
    },
    buttonMinusIsDisabled() {
      return !this.pizzaRecipe.ingredients.find(
        (ing) => ing.id === this.ingredientId
      );
    },
    itemCounterCurrentValue() {
      return (
        this.pizzaRecipe.ingredients.filter(
          (ing) => ing.id === this.ingredientId
        )[0]?.count ?? 0
      );
    },
  },
};
</script>
