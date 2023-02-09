<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <BuilderSauceSelector />

        <div class="ingredients__filling">
          <p>Начинка NEW:</p>
          <ul class="ingredients__list">
            <BuilderIngredientItem
              v-for="ingredient in pizzaBuilder.ingredients"
              :key="ingredient.id"
              :item="ingredient"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector";
import BuilderIngredientItem from "@/modules/builder/components/BuilderIngredientItem";

import { mapState } from "vuex";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    BuilderSauceSelector,
    BuilderIngredientItem,
  },

  data() {
    return {};
  },

  computed: {
    ...mapState("Builder", {
      pizzaBuilder: "pizzaBuilder",
    }),
  },
};
</script>
