<template>
  <div>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <br />
          <button @click.prevent="logMeIn">LOGIN ME</button>

          <BuilderDoughSelector />
          <BuilderSizeSelector />
          <BuilderIngredientsSelector />
          <BuilderPizzaView />
        </div>
      </form>
    </main>
  </div>
</template>

<script>
//импортируем компоненты
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

import axios from "@/plugins/axios";
import { AuthApiService } from "@/services/api.service";
import { saveToken } from "@/services/jwt.service";

export default {
  name: "IndexMain",
  data() {
    return {};
  },
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  mounted() {
    //console.dir(axios);
  },
  methods: {
    async logMeIn() {
      const login = "user@example.com";
      const password = "user@example.com";

      const { data } = await axios.post("login", {
        email: login,
        password: password,
      });

      console.log(data);

      const auth = new AuthApiService();
      console.dir(auth);

      saveToken(data.token);
      auth.setAuthHeader();

      // const who = await axios.get("whoAmI");
      // console.dir(who.data);

      console.dir(
        axios.get("whoAmI").then((res) => {
          const { data } = res;

          console.log(data);
        })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.dummy-selector {
  border: 1px;
}
</style>
