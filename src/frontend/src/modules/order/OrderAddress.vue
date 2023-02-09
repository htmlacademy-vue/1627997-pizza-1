<template>
  <p class="order__address">Адрес доставки: {{ getAddress }}</p>
</template>

<script>
export default {
  name: "OrderAddress",
  props: {
    address: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {};
  },

  computed: {
    getAddress() {
      return this.address?.name ?? "Заберу сам";
    },
  },
};
</script>
