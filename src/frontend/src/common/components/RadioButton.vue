<!-- eslint-disable prettier/prettier -->
<template>
  <input :value="value" :checked="checked" type="radio" v-on="$listeners" />
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    value: {
      type: Number,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
