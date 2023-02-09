<!-- eslint-disable prettier/prettier -->
<template>
  <div class="product cart-list__product">
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="item.name"
    />
    <div class="product__text">
      <h2>{{ item.pizzaName }}</h2>
      <ul>
        <li>{{ pizzaSizeAndDoughInfo }}</li>
        <li>{{ pizzaSauceInfo }}</li>
        <li>{{ pizzaIngredientsInfo }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartPizzaItemInfo",
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
    pizzaSizeAndDoughInfo() {
      const size = this.item.sizes.name;
      const dough = this.item.dough.value === "large" ? "толстом" : "тонком";

      return `${size}, на ${dough} тесте`;
    },
    pizzaSauceInfo() {
      const sauce = this.item.sauces.name.toLowerCase();

      return `Соус: ${sauce}`;
    },
    pizzaIngredientsInfo() {
      const ingredients = this.item.ingredients
        .map((el) => el.name)
        .join(", ")
        .toLowerCase();

      return `Начинка: ${ingredients}`;
    },
  },
};
</script>
