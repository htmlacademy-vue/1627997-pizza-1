;<!-- eslint-disable prettier/prettier -->
<template>
  <div class="order__wrapper">
    <div class="order__number">
      <b>Заказ #{{ order.orderId }}</b>
    </div>

    <div class="order__sum">
      <span>Сумма заказа: {{ order.orderTotalPrice }} ₽</span>
    </div>

    <div class="order__button">
      <button 
        type="button" 
        class="button button--border"
        @click="deleteThisOrder(order.orderId)"
      >Удалить</button>
    </div>
    <div class="order__button">
      <button 
        type="button" 
        class="button"
        @click="repeatThisOrder(order.orderId)"
      >Повторить</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "OrderHeadingInfo",
  data() {
    return {};
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions("Orders", {
      deleteThisOrder: "deleteOrder", //ГОТОВ
      repeatThisOrder: "repeatOrder",
    }),
    //  СДЕЛАТЬ НОРМАЛЬНЫЕ МЕТОДЫ ВМЕСТО МОКОВЫХ: делаем стор адреса, потом доделываем стор заказов (повторить заказ), потом эти методы
  },
};
</script>
