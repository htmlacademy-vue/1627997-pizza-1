<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <BuilderSelectorItem
        v-for="size in pizzaBuilder.sizes"
        :key="size.id"
        :item="size"
        :class="`diameter__input--${PIZZA_SIZES[size.id]}`"
        class="diameter__input"
      />

      <div class="sheet__content diameter">
        <label
          v-for="size in pizza.sizes"
          :key="size.id"
          :class="`diameter__input--${PIZZA_SIZES[size.id]}`"
          class="diameter__input"
        >
          <RadioButton
            name="diameter_OLD"
            class="visually-hidden"
            :value="size.id"
            :checked="pizzaRecipe.sizes.id === size.id"
            @change="
              setRecipeParam({
                pizzaParam: 'sizes',
                id: $event.target.value,
              })
            "
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import BuilderSelectorItem from "@/modules/builder/components/BuilderSelectorItem";
import { mapState, mapMutations } from "vuex";

export default {
  name: "BuilderSizeSelector",
  components: {
    RadioButton,
    BuilderSelectorItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("Builder", {
      pizza: "pizzaStore",
      pizzaRecipe: "pizzaRecipeStore",
      PIZZA_SIZES: "PIZZA_SIZES",
      pizzaBuilder: "pizzaBuilder",
    }),
  },
  methods: {
    ...mapMutations("Builder", ["setRecipeParam"]),
  },
};
</script>
