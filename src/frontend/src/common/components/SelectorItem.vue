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
import { INGREDIENTS_ENG_NAMES } from "@/common/constants";

export default {
  name: "SelectorItem",
  props: {
    ingredient: {
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
      INGREDIENTS_ENG_NAMES,
    };
  },
};
</script>
