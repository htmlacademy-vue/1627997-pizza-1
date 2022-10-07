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
              $emit('pizza-param-changed', {
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
import { PIZZA_SIZES } from "@/common/constants";
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",
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
      PIZZA_SIZES,
    };
  },
};
</script>
