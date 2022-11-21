<!-- eslint-disable prettier/prettier -->
<template>
  <li class="ingredients__item">
    <AppDrag :transfer-data="item" :allow-drag="item.count < 3">
      <span
        :class="`filling--${INGREDIENTS_ENG_NAMES[item.id]}`"
        class="filling"
      >
        {{ item.name }}
      </span>
    </AppDrag>

    <AppItemCounter
      class="ingredients__counter"
      :value="item.count"
      :max="3"
      @change="setIngredientCount"
    />
  </li>
</template>

<script>
import AppDrag from "@/common/components/AppDrag";
import AppItemCounter from "@/common/components/AppItemCounter";

import { mapState, mapMutations } from "vuex";

//импортируем типы мутаций
import { SET_INGREDIENT_COUNT } from "@/store/mutation-types";

export default {
  name: "BuilderIngredientItem",
  components: { AppDrag, AppItemCounter },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("Builder", {
      pizza: "pizzaStore",
      pizzaRecipe: "pizzaRecipeStore",
      INGREDIENTS_ENG_NAMES: "INGREDIENTS_ENG_NAMES",
      pizzaBuilder: "pizzaBuilder",
    }),
  },
  methods: {
    ...mapMutations("Builder", {
      setCount: SET_INGREDIENT_COUNT,
    }),
    setIngredientCount({ count }) {
      this.setCount({ ...this.item, count });
    },
  },
};
</script>
