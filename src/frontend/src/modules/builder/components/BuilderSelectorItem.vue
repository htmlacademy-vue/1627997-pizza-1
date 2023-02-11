<template>
  <label v-bind="$attrs">
    <AppRadioButton
      class="visually-hidden"
      :params="item"
      @selected="setSelectorItem(item)"
    />
    <b v-if="item.type === 'dough'">{{ item.name }}</b>
    <span>{{ item.type === "dough" ? item.description : item.name }}</span>
  </label>
</template>

<script>
import AppRadioButton from "@/common/components/AppRadioButton";

import { mapMutations } from "vuex";
import { SET_SELECTOR_ITEM } from "@/store/mutation-types";

export default {
  name: "BuilderSelectorItem",
  components: { AppRadioButton },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ...mapMutations("Builder", {
      setSelectorItem: SET_SELECTOR_ITEM,
    }),
  },
};
</script>
