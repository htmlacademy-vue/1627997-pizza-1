<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in pizza.sizes"
          :key="size.id"
          :class="`diameter__input--${PIZZA_SIZES[size.id]}`"
          class="diameter__input"
        >
          <RadioButton
            name="diameter"
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
import { mapState, mapMutations } from "vuex";

export default {
  name: "BuilderSizeSelector",
  components: {
    RadioButton,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("Builder", {
      pizza: "pizzaStore",
      pizzaRecipe: "pizzaRecipeStore",
      PIZZA_SIZES: "PIZZA_SIZES",
    }),
  },
  methods: {
    ...mapMutations("Builder", ["setRecipeParam"]),
  },
};
</script>
