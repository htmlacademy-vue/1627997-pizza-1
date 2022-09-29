<template>
  <p>Итого: {{ pizzaTotalPrice }} ₽</p>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
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
    return {};
  },
  computed: {
    pizzaTotalPrice() {
      return (
        this.pizzaRecipe.sizes.multiplier *
        (this.pizzaRecipe.dough.price +
          this.pizzaRecipe.sauces.price +
          this.calcIngredientsPrice(this.pizzaRecipe.ingredients))
      );
    },
  },
  methods: {
    calcIngredientsPrice(arr) {
      return arr.reduce((sum, item) => {
        return sum + (item?.count ?? 1) * item.price;
      }, 0);
    },
  },
};
</script>
