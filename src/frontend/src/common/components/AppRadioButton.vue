<template>
  <input
    v-bind="$attrs"
    type="radio"
    :name="params.type"
    :value="params.value"
    :checked="params.checked"
    @change="$emit('selected')"
  />
</template>

<script>
export default {
  name: "AppRadioButton",
  props: {
    params: {
      type: Object,
      required: true,
    },
  },
};
</script>
