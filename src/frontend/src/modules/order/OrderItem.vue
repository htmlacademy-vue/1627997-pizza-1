<template>
  <section class="sheet order">
    <OrderHeadingInfo :order="order" />
    <OrderPizzas :pizzas="order.orderPizzasNormalized" />
    <OrderMisc :misc="order.orderMiscNormalized" />
    <OrderAddress :address="order.orderAddress" />
  </section>
</template>

<script>
import OrderHeadingInfo from "@/modules/order/OrderHeadingInfo";
import OrderPizzas from "@/modules/order/OrderPizzas";
import OrderMisc from "@/modules/order/OrderMisc";
import OrderAddress from "@/modules/order/OrderAddress";

export default {
  name: "OrderItem",
  components: {
    OrderHeadingInfo,
    OrderPizzas,
    OrderMisc,
    OrderAddress,
  },

  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {};
  },
};
</script>
