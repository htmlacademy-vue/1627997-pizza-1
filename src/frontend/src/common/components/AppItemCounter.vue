<!-- eslint-disable prettier/prettier -->
<template>
  <div class="counter" v-bind="$attrs">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="$emit('change', { count: -1 })"
      :disabled="buttonMinusIsDisabled"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="value" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="buttonClassObject"
      @click="$emit('change', { count: 1 })"
      :disabled="buttonPlusIsDisabled"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "AppItemCounter",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      //из пропсов
      type: Number,
      default: null,
    },
    buttonTheme: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    buttonMinusIsDisabled() {
      return this.value <= this.min;
    },
    buttonPlusIsDisabled() {
      return this.max === null ? false : this.value >= this.max;
    },
    buttonClassObject() {
      return {
        "counter__button--orange": this.buttonTheme?.orange,
      };
    },
  },
};
</script>
