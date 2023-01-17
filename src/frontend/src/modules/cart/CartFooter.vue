<!-- eslint-disable prettier/prettier -->
<template>
  <section class="footer">
    <div class="footer__more">
      <a
        href="#"
        class="button button--border button--arrow"
        @click.prevent="makeAnotherPizza"
        >Хочу еще одну</a
      >
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ cartTotalCost }} ₽</b>
    </div>

    <div class="footer__submit">
      <button type="submit" class="button" @click.prevent="makeOrder">
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

//импортируем типы мутаций
import { CLEAR_CART, RESET_BUILDER_PIZZA } from "@/store/mutation-types";

export default {
  name: "CartFooter",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("Cart", ["cartTotalCost"]),
  },
  methods: {
    ...mapMutations("Cart", {
      clearCart: CLEAR_CART,
    }),
    ...mapMutations("Builder", {
      resetBuilder: RESET_BUILDER_PIZZA,
    }),
    ...mapActions("Orders", ["postOrder"]),
    ...mapActions("Addresses", ["getAddresses"]),
    async makeOrder() {
      //отправляем заказ
      const data = await this.postOrder();

      //если всё ок и в ответ пришёл id, делаем всё, что надо по логике
      if (data?.id) {
        //открываем попап
        this.$emit("openPopup");

        //очищаем конструктор
        this.resetBuilder();

        //очищаем корзину
        this.clearCart();

        //обновляем список адресов на случай, если был новый создан в заказе
        this.getAddresses();
      }
    },
    makeAnotherPizza() {
      //очищаем конструктор
      this.resetBuilder();

      this.$router.push("/");
    },
  },
};
</script>
