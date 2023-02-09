<!-- eslint-disable prettier/prettier -->
<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <OrderItem
      v-for="order in getOrdersExtended"
      :key="order.orderId"
      :order="order"
    />

  </div>
</template>

<script>
import OrderItem from "@/modules/order/OrderItem";

import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Orders",
  components: {
    OrderItem,
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters("Orders", ["getOrdersExtended"]),
    ...mapState("Orders", ["orders"]),
  },

  created() {
    this.getOrders();
  },

  methods: {
    ...mapActions("Orders", ["getOrders"]),
  },
};
</script>
