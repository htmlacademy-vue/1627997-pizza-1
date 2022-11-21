<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <BuilderSelectorItem
          v-for="dough in pizzaBuilder.dough"
          :key="dough.id"
          :item="dough"
          :class="`dough__input--${dough.value}`"
          class="dough__input"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BuilderSelectorItem from "@/modules/builder/components/BuilderSelectorItem";
import { mapState } from "vuex";

export default {
  name: "BuilderDoughSelector",
  components: {
    BuilderSelectorItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("Builder", {
      pizzaBuilder: "pizzaBuilder",
    }),
  },
};
</script>
