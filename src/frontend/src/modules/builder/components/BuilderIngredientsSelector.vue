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
                setRecipeParam({
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
              <AppDrag
                :transfer-data="ingredient"
                :draggable="canBeDragged(ingredient)"
              >
                <SelectorItem
                  :ingredient="ingredient"
                  @change-ingredient-count="changeIngredientCount"
                />
              </AppDrag>
              <ItemCounter
                :ingredientId="ingredient.id"
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
//import { SAUCES_ENG_NAMES, INGREDIENTS_ENG_NAMES } from "@/common/constants";
import RadioButton from "@/common/components/RadioButton";
import ItemCounter from "@/common/components/ItemCounter";
import SelectorItem from "@/common/components/SelectorItem";
import AppDrag from "@/common/components/AppDrag";
import { mapState, mapMutations } from "vuex";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    RadioButton,
    ItemCounter,
    SelectorItem,
    AppDrag,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("Builder", {
      pizza: "pizzaStore",
      pizzaRecipe: "pizzaRecipeStore",
      SAUCES_ENG_NAMES: "SAUCES_ENG_NAMES",
      INGREDIENTS_ENG_NAMES: "INGREDIENTS_ENG_NAMES",
    }),
  },
  methods: {
    ...mapMutations("Builder", ["setRecipeParam", "setRecipeIngredient"]),
    changeIngredientCount({ id, count }) {
      this.setRecipeIngredient({
        pizzaParam: "ingredients",
        id,
        count,
      });
    },
    canBeDragged({ id }) {
      const isInRecipe = this.pizzaRecipe.ingredients.some(
        (ing) => ing.id === id
      );
      return !(
        isInRecipe &&
        this.pizzaRecipe.ingredients.find((ing) => ing.id === id).count === 3
      );
    },
  },
};
</script>
