<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="dough in pizza.dough"
          :key="dough.id"
          :class="`dough__input--${DOUGH_TYPES[dough.id]}`"
          class="dough__input"
        >
          <RadioButton
            name="dought"
            class="visually-hidden"
            :value="dough.id"
            :checked="pizzaRecipe.dough.id === dough.id"
            @change="
              setRecipeParam({
                pizzaParam: 'dough',
                id: $event.target.value,
              })
            "
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import { mapState, mapMutations } from "vuex";

export default {
  name: "BuilderDoughSelector",
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
      DOUGH_TYPES: "DOUGH_TYPES",
    }),
  },
  methods: {
    ...mapMutations("Builder", ["setRecipeParam"]),
  },
};
</script>
