<template>
  <AppLayout>
    <router-view />
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
    console.dir(this.$store);
    // console.dir(this);
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
