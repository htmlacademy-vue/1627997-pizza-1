<!-- eslint-disable prettier/prettier -->
<template>
  <ul class="order__additional">
    <li v-for="el in misc" :key="el.id">
      <img 
        :src="el.image" 
        width="20" 
        height="30" 
        :alt="el.name" 
      />
      <p>
        <span>{{ el.name }}</span>
        <b>{{ el.price * el.count }} ₽</b>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "OrderMisc",
  data() {
    return {};
  },
  props: {
    misc: {
      type: Array,
      required: true,
    },
  },
};
</script>
