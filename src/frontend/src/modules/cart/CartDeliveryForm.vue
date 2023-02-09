<!-- eslint-disable prettier/prettier -->
<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          v-model="deliveryTypeValue" 
          name="delivery_type" 
          class="select" 
        >
          <option
            v-for="type in deliveryTypesList"
            :key="type.id"
            :value="type.id"
            :selected="type.id === deliveryTypeValue"
          >
            {{ type.name }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          v-model="deliveryPhoneValue"
        />
      </label>

      <div 
        v-if="deliveryTypeValue !== 'self'"
        class="cart-form__address" 
      >
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input 
                type="text" 
                name="street" 
                v-model="deliveryStreetValue"
                :disabled="inputIsDisabled"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input 
                type="text" 
                name="house" 
                v-model="deliveryBuildingValue"
                :disabled="inputIsDisabled"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input 
                type="text" 
                name="apartment" 
                v-model="deliveryFlatValue"
                :disabled="inputIsDisabled"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deliveryTypes } from "@/common/helpers";

import { mapGetters, mapState, mapMutations } from "vuex";
import {
  SET_DELIVERY_TYPE,
  SET_DELIVERY_PHONE,
  SET_DELIVERY_FIELD,
} from "@/store/mutation-types";

export default {
  name: "CartDeliveryForm",
  data() {
    return {};
  },

  computed: {
    ...mapGetters("Auth", ["isAuth"]),
    ...mapState("Addresses", ["addresses", "deliveryFormData", "deliveryType"]),

    deliveryTypesList() {
      const deliveryTypesDefault = deliveryTypes();
      const deliveryTypesUser = this.isAuth ? this.addresses : [];

      return [...deliveryTypesDefault, ...deliveryTypesUser];
    },

    deliveryTypeValue: {
      get() {
        return this.deliveryType;
      },
      set(value) {
        this.setDeliveryType(value);
      },
    },

    deliveryPhoneValue: {
      get() {
        return this.deliveryFormData.phone;
      },
      set(value) {
        this.setDeliveryPhone(value);
      },
    },

    deliveryStreetValue: {
      get() {
        return this.deliveryFormData.street;
      },
      set(value) {
        this.setDeliveryField({
          name: "street",
          value,
        });
      },
    },

    deliveryBuildingValue: {
      get() {
        return this.deliveryFormData.building;
      },
      set(value) {
        this.setDeliveryField({
          name: "building",
          value,
        });
      },
    },

    deliveryFlatValue: {
      get() {
        return this.deliveryFormData.flat;
      },
      set(value) {
        this.setDeliveryField({
          name: "flat",
          value,
        });
      },
    },

    inputIsDisabled() {
      return (
        this.deliveryTypeValue !== "self" &&
        this.deliveryTypeValue !== "new_address"
      );
    },
  },

  methods: {
    ...mapMutations("Addresses", {
      setDeliveryType: SET_DELIVERY_TYPE,
      setDeliveryPhone: SET_DELIVERY_PHONE,
      setDeliveryField: SET_DELIVERY_FIELD,
    }),
  },
};
</script>
