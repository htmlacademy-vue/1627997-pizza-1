<!-- eslint-disable prettier/prettier -->
<template>
  <ul v-if="pizzas" class="order__list">
    <li v-for="p in pizzas" :key="p.pizzaID" class="order__item">
      <CartPizzaItemInfo :item="p" />

      <p class="order__price">{{ getPizzaTotalCostInfo(p) }} ₽</p>
    </li>
  </ul>
</template>

<script>
import CartPizzaItemInfo from "@/modules/cart/CartPizzaItemInfo";
export default {
  name: "OrderPizzas",
  components: {
    CartPizzaItemInfo,
  },
  data() {
    return {};
  },
  props: {
    pizzas: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getPizzaTotalCostInfo(pizza) {
      return pizza.pizzaCount === 1
        ? pizza.pizzaPrice
        : `${pizza.pizzaCount}x${pizza.pizzaPrice}`;
    },
  },
};
</script>
