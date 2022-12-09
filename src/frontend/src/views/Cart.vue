<!-- eslint-disable prettier/prettier -->
<template>
  <form action="" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div class="sheet cart__empty" v-if="isCartEmpty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul class="cart-list sheet" v-else>
          <CartPizzaItem
            v-for="pizza in pizzas"
            :key="pizza.id"
            :item="pizza"
          />
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <CartMiscItem v-for="item in misc" :key="item.id" :item="item" />
          </ul>
        </div>

        <CartDeliveryForm />

      </div>
    </main>
    
    <CartFooter @openPopup="openPopup"/>
    <OrderPopup 
      @closePopup="closePopup"
      v-if="showPopup"
    />
  </form>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import CartPizzaItem from "@/modules/cart/CartPizzaItem";
import CartMiscItem from "@/modules/cart/CartMiscItem";
import CartDeliveryForm from "@/modules/cart/CartDeliveryForm";
import CartFooter from "@/modules/cart/CartFooter";
import OrderPopup from "@/views/OrderPopup";

export default {
  name: "Cart",
  components: {
    CartPizzaItem,
    CartMiscItem,
    CartDeliveryForm,
    CartFooter,
    OrderPopup,
  },
  data() {
    return {
      showPopup: false,
    };
  },
  computed: {
    ...mapGetters("Cart", ["isCartEmpty", "cartTotalCost"]),
    ...mapState("Cart", ["pizzas", "misc"]),
    ...mapGetters("Auth", ["isAuth"]),
  },
  methods: {
    openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;

      //делаем переадресацию, в зависимости от того, авторизован юзер или нет
      const route = this.isAuth ? "/orders" : "/";

      this.$router.push(route);
    },
  },
};
</script>
