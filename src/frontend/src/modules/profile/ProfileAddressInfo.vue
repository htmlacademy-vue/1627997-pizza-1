<!-- eslint-disable prettier/prettier -->
<template>
  <div class="layout__address">
    <div class="sheet address-form">
      <div class="address-form__header">
        <b>{{ address.name }}</b>
        <div class="address-form__edit">
          <button 
            @click="editAddress(address)" 
            type="button" 
            class="icon"
          >
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>{{ address.street }}, д. {{ address.building }}, кв. {{ address.flat || `` }}</p>
      <small>{{ address.comment || `` }}</small>
    </div>
  </div>
</template>

<script>
import { EDIT_ADDRESS } from "@/store/mutation-types";
import { mapMutations } from "vuex";

export default {
  name: "ProfileAddressInfo",
  data() {
    return {};
  },
  props: {
    address: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  methods: {
    ...mapMutations("Addresses", {
      editAddress: EDIT_ADDRESS,
    }),
  },
};
</script>
