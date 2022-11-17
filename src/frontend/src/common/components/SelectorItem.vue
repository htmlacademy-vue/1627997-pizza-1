<!-- eslint-disable prettier/prettier -->
<template>
  <span
    :class="`filling--${INGREDIENTS_ENG_NAMES[ingredient.id]}`"
    class="filling"
  >
    {{ ingredient.name }}
  </span>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SelectorItem",
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("Builder", {
      pizzaRecipe: "pizzaRecipeStore",
      INGREDIENTS_ENG_NAMES: "INGREDIENTS_ENG_NAMES",
    }),
  },
};
</script>
