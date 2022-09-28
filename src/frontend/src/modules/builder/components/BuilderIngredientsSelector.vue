<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <label
            v-for="sauce in pizza.sauces"
            :key="sauce.id"
            class="radio ingredients__input"
          >
            <RadioButton
              name="sauce"
              :value="sauce.id"
              :checked="pizzaRecipe.sauces.id === sauce.id"
              @change="
                $emit('pizza-param-changed', {
                  pizzaParam: 'sauces',
                  id: $event.target.value,
                })
              "
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in pizza.ingredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <span
                :class="`filling--${INGREDIENTS_ENG_NAMES[ingredient.id]}`"
                class="filling"
              >
                {{ ingredient.name }}
              </span>
              <ItemCounter
                :ingredientId="ingredient.id"
                :pizzaRecipe="pizzaRecipe"
                @change-ingredient-count="changeIngredientCount"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SAUCES_ENG_NAMES, INGREDIENTS_ENG_NAMES } from "@/common/constants";
import RadioButton from "@/common/components/RadioButton";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    RadioButton,
    ItemCounter,
  },
  props: {
    pizza: {
      type: Object,
      required: true,
    },
    pizzaRecipe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      SAUCES_ENG_NAMES,
      INGREDIENTS_ENG_NAMES,
    };
  },
  methods: {
    changeIngredientCount({ id, count }) {
      this.$emit("pizza-param-changed", {
        pizzaParam: "ingredients",
        id,
        count,
      });
    },
  },
};
</script>
