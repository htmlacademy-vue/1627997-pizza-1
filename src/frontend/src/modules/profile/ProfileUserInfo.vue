<template>
  <div class="user">
    <picture>
      <source
        type="image/webp"
        :srcset="`${imgUrlNormalized}@2x.webp 1x,   ${imgUrlNormalized}@4x.webp 2x`"
      />
      <img
        :src="`${imgUrlNormalized}@2x.jpg`"
        :srcset="`${imgUrlNormalized}@4x.jpg`"
        :alt="user.name"
        width="72"
        height="72"
      />
    </picture>
    <div class="user__name">
      <span>{{ user.name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ user.phone }}</span>
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProfileUserInfo",
  data() {
    return {};
  },
  computed: {
    ...mapState("Auth", ["user"]),
    imgUrlNormalized() {
      //надо убрать .jpg из /public/img/users/user.jpg
      return this.user?.avatar?.replace(".jpg", "");
    },
  },
};
</script>
