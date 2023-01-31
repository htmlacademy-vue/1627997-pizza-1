<!-- eslint-disable prettier/prettier -->
<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form action="" method="post" @submit.prevent="logMeIn">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            type="email"
            name="email"
            placeholder="example@mail.ru"
            v-model="email"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            type="password"
            name="pass"
            placeholder="***********"
            v-model="password"
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { validateEmail } from "@/common/helpers";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions("Auth", ["login"]),
    async logMeIn() {
      const login = this.email.trim();
      const password = this.password.trim();

      //валидация
      if (validateEmail(login) && password.length) {
        try {
          await this.login({
            email: login,
            password: password,
          });

          await this.$router.push("/");
        } catch (err) {
          console.log("...ошибка авторизации", err);
        }
      }
    },
  },
};
</script>
