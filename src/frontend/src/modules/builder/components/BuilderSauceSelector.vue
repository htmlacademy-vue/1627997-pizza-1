<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <BuilderSelectorItem
      v-for="sauce in pizzaBuilder.sauces"
      :key="sauce.id"
      :item="sauce"
      class="radio ingredients__input"
    />
  </div>
</template>

<script>
import BuilderSelectorItem from "@/modules/builder/components/BuilderSelectorItem";

import { mapState } from "vuex";

export default {
  name: "BuilderSauceSelector",
  components: { BuilderSelectorItem },
  computed: {
    ...mapState("Builder", {
      pizzaBuilder: "pizzaBuilder",
    }),
  },
};
</script>
