<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <BuilderSelectorItem
          v-for="size in pizzaBuilder.sizes"
          :key="size.id"
          :item="size"
          :class="`diameter__input--${size.value}`"
          class="diameter__input"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BuilderSelectorItem from "@/modules/builder/components/BuilderSelectorItem";
import { mapState } from "vuex";

export default {
  name: "BuilderSizeSelector",
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
