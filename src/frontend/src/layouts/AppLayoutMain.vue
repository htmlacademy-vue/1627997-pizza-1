<template>
  <div>
    <AppLayoutHeader />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
export default {
  name: "AppLayoutMain",
  components: {
    AppLayoutHeader,
  },
};
</script>

<style></style>
