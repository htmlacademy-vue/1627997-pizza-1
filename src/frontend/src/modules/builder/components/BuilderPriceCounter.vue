<template>
  <p>Итого: {{ pizzaTotalCost }} ₽</p>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BuilderPriceCounter",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("Builder", ["pizzaTotalCost"]),
  },
};
</script>
