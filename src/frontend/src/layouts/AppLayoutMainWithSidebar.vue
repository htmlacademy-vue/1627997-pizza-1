<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <AppLayoutHeader />
    <main class="layout">
      <AppLayoutSidebar />
      <slot />
    </main>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import AppLayoutSidebar from "@/layouts/AppLayoutSidebar";

export default {
  name: "AppLayoutMainWithSidebar",
  components: {
    AppLayoutHeader,
    AppLayoutSidebar,
  },
};
</script>

<style lang="scss" scoped>
.dummy-selector {
  border: 1px;
}
</style>
