<template>
  <div>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

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
    //console.dir(this.$store);
  },
};
</script>

<style lang="scss" scoped>
.dummy-selector {
  border: 1px;
}
</style>
