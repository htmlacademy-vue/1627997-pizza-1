<!-- eslint-disable prettier/prettier -->
<template>
  <AppLayout>
    <transition
      name="slide"
      appear
      mode="out-in"
    >
      <router-view />
    </transition>
  </AppLayout>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  created() {
    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
