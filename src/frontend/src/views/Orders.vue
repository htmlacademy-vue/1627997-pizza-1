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

    <section class="sheet order">
      <div class="order__wrapper">
        <div class="order__number">
          <b>Заказ #11199929</b>
        </div>

        <div class="order__sum">
          <span>Сумма заказа: 1564 ₽</span>
        </div>

        <div class="order__button">
          <button type="button" class="button button--border">Удалить</button>
        </div>
        <div class="order__button">
          <button type="button" class="button">Повторить</button>
        </div>
      </div>

      <ul class="order__list">
        <li class="order__item">
          <div class="product">
            <img
              src="public/img/product.svg"
              class="product__img"
              width="56"
              height="56"
              alt="Капричоза"
            />
            <div class="product__text">
              <h2>Капричоза</h2>
              <p>
                30 см, на тонком тесте<br />
                Соус: томатный<br />
                Начинка: грибы, лук, ветчина, пармезан, ананас
              </p>
            </div>
          </div>

          <p class="order__price">782 ₽</p>
        </li>
        <li class="order__item">
          <div class="product">
            <img
              src="public/img/product.svg"
              class="product__img"
              width="56"
              height="56"
              alt="Капричоза"
            />
            <div class="product__text">
              <h2>Моя любимая</h2>
              <p>
                30 см, на тонком тесте<br />
                Соус: томатный<br />
                Начинка: грибы, лук, ветчина, пармезан, ананас
              </p>
            </div>
          </div>

          <p class="order__price">2х782 ₽</p>
        </li>
      </ul>

      <ul class="order__additional">
        <li>
          <img
            src="public/img/cola.svg"
            width="20"
            height="30"
            alt="Coca-Cola 0,5 литра"
          />
          <p>
            <span>Coca-Cola 0,5 литра</span>
            <b>56 ₽</b>
          </p>
        </li>
        <li>
          <img
            src="public/img/sauce.svg"
            width="20"
            height="30"
            alt="Острый соус"
          />
          <p>
            <span>Острый соус</span>
            <b>30 ₽</b>
          </p>
        </li>
        <li>
          <img
            src="public/img/potato.svg"
            width="20"
            height="30"
            alt="Картошка из печи"
          />
          <p>
            <span>Картошка из печи</span>
            <b>170 ₽</b>
          </p>
        </li>
      </ul>

      <p class="order__address">
        Адрес доставки: Тест (или если адрес новый - писать целиком)
      </p>
    </section>
  </div>
</template>

<script>
import OrderItem from "@/modules/order/OrderItem";

import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Orders",
  data() {
    return {};
  },
  components: {
    OrderItem,
  },
  methods: {
    ...mapActions("Orders", ["getOrders"]),
  },
  computed: {
    ...mapGetters("Orders", ["getOrdersExtended"]),
    ...mapState("Orders", ["orders"]),
  },
  created() {
    this.getOrders();
  },
};
</script>
