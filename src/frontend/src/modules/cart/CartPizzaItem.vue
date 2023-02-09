<!-- eslint-disable prettier/prettier -->
<template>
  <li class="cart-list__item">
    <CartPizzaItemInfo :item="item" />

    <AppItemCounter
      class="cart-list__counter"
      :button-theme="{ orange: true }"
      :value="item.pizzaCount"
      @change="setPizzaCount"
    />

    <div class="cart-list__price">
      <b>{{ price }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button 
        @click="changePizza"
        type="button" 
        class="cart-list__edit"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import CartPizzaItemInfo from "@/modules/cart/CartPizzaItemInfo";
import AppItemCounter from "@/common/components/AppItemCounter";

import { mapMutations, mapGetters } from "vuex";
import {
  SET_PIZZA_COUNT,
  RESET_BUILDER_PIZZA,
  CHANGE_PIZZA,
} from "@/store/mutation-types";

export default {
  name: "CartPizzaItem",
  components: { CartPizzaItemInfo, AppItemCounter },

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
    ...mapGetters("Cart", ["pizzaPriceByID"]),

    price() {
      return this.pizzaPriceByID(this.item.pizzaID);
    },
  },

  methods: {
    ...mapMutations("Cart", {
      setCount: SET_PIZZA_COUNT,
    }),

    ...mapMutations("Builder", {
      resetBuilder: RESET_BUILDER_PIZZA,
      changePizzaRecipe: CHANGE_PIZZA,
    }),

    setPizzaCount({ count }) {
      this.setCount({ ...this.item, count });
    },

    changePizza() {
      this.resetBuilder();
      this.changePizzaRecipe(this.item);
      this.$router.push("/");
    },
  },
};
</script>
