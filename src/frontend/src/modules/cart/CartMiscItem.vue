<!-- eslint-disable prettier/prettier -->
<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="item.image" width="39" height="60" :alt="item.name" />
      <span>{{ item.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <AppItemCounter
        class="additional-list__counter"
        :is-orange="true"
        :value="item.count"
        @change="setMiscCount"
      />

      <div class="additional-list__price">
        <b>× {{ item.price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import AppItemCounter from "@/common/components/AppItemCounter";

//импортируем типы мутаций
import { SET_MISC_COUNT } from "@/store/mutation-types";

import { mapMutations } from "vuex";

export default {
  name: "CartMiscItem",
  components: { AppItemCounter },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapMutations("Cart", {
      setCount: SET_MISC_COUNT,
    }),
    setMiscCount({ count }) {
      this.setCount({ ...this.item, count });
    },
  },
};
</script>
