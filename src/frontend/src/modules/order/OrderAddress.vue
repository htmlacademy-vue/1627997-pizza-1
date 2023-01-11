<template>
  <p class="order__address">Адрес доставки: {{ address.name }}</p>
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
};
</script>
