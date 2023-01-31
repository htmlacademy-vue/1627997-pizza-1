<template>
  <p class="order__address">Адрес доставки: {{ getAddress }}</p>
</template>

<script>
export default {
  name: "OrderAddress",
  data() {
    return {};
  },
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getAddress() {
      return this.address?.name ?? "Заберу сам";
    },
  },
};
</script>
