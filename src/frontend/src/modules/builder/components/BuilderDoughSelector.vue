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
              $emit('pizza-param-changed', {
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
import { DOUGH_TYPES } from "@/common/constants";
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
  },
  props: {
    pizza: {
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
      DOUGH_TYPES,
    };
  },
};
</script>
