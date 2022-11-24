<!-- eslint-disable prettier/prettier -->
<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart"> {{ cartTotalCost }} ₽ </router-link>
    </div>
    <div class="header__user">
      <router-link 
        v-if="!isAuth" 
        to="/login" 
        class="header__login"
      >
        <span>Войти</span>
      </router-link>

      <router-link 
        v-else 
        to="/profile" 
      >
        <picture>
          <source
            type="image/webp"
            srcset="@/assets/img/users/user5.webp 1x, @/assets/img/users/user5@2x.webp 2x"
          />
          <img
            src="@/assets/img/users/user5.jpg"
            srcset="@/assets/img/users/user5@2x.jpg"
            alt="Василий Ложкин"
            width="32"
            height="32"
          />
        </picture>
        <span>USERNAME</span>
      </router-link>
      <a v-if="isAuth" href="/" class="header__logout"><span>Выйти</span></a>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppLayoutHeader",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("Cart", ["cartTotalCost"]),
    ...mapGetters("Auth", ["isAuth"]),
  },
};
</script>

<style lang="scss" scoped>
.dummy-selector {
  border: 1px;
}
</style>
