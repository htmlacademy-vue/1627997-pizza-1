<!-- eslint-disable prettier/prettier -->
<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>
    <ProfileUserInfo />
    <ProfileAddressInfo 
      v-for="address in addresses"
      :key="address.id"
      :address="address"
    />
    <ProfileAddressEditForm v-if="showAddressEditForm" />

    <div class="layout__button">
      <button 
        @click="showEditForm"
        type="button" 
        class="button button--border">
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

import { SHOW_ADDRESS_EDIT_FORM } from "@/store/mutation-types";

import ProfileUserInfo from "@/modules/profile/ProfileUserInfo";
import ProfileAddressInfo from "@/modules/profile/ProfileAddressInfo";
import ProfileAddressEditForm from "@/modules/profile/ProfileAddressEditForm";

export default {
  name: "Profile",
  data() {
    return {};
  },
  components: {
    ProfileUserInfo,
    ProfileAddressInfo,
    ProfileAddressEditForm,
  },
  methods: {
    ...mapActions("Addresses", ["getAddresses"]),
    ...mapMutations("Addresses", {
      showEditForm: SHOW_ADDRESS_EDIT_FORM,
    }),
  },
  created() {
    this.getAddresses();
  },
  computed: {
    ...mapState("Addresses", [
      "addresses",
      "showAddressEditForm",
      "showDeleteButton",
    ]),
  },
};
</script>
