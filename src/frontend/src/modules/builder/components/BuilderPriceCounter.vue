<template>
  <p>Итого: {{ pizzaTotalPrice }} ₽</p>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "BuilderPriceCounter",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("Builder", ["pizzaTotalPrice"]),
    ...mapState("Builder", {
      pizza: "pizzaStore",
      pizzaRecipe: "pizzaRecipeStore",
    }),
  },
};
</script>
