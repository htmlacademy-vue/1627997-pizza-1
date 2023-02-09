<!-- eslint-disable prettier/prettier -->
   <template>
  <div class="layout__address">
    <form
      @submit.prevent="postAddress"
      action=""
      method="post"
      class="address-form address-form--opened sheet"
    >
      <div class="address-form__header">
        <b>Адрес №1</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <input
            v-model="addressNameValue"
              type="text"
              name="addr-name"
              placeholder="Введите название адреса"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <input
              v-model="addressStreetValue"
              type="text"
              name="addr-street"
              placeholder="Введите название улицы"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <input
              v-model="addressBuildingValue"
              type="text"
              name="addr-house"
              placeholder="Введите номер дома"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <input
              v-model="addressFlatValue"
              type="text"
              name="addr-apartment"
              placeholder="Введите № квартиры"
            />
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input
              v-model="addressCommentValue"
              type="text"
              name="addr-comment"
              placeholder="Введите комментарий"
            />
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <button
          v-if="showDeleteButton"
          @click="deleteAddress"
          type="button"
          class="button button--transparent"
        >
          Удалить
        </button>
        <button 
          type="submit" 
          class="button"
        >
          Сохранить
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import {
  SET_ADDRESS_FIELD,
  DELETE_ADDRESS,
  POST_ADDRESS,
} from "@/store/mutation-types";

export default {
  name: "ProfileAddressEditForm",
  data() {
    return {};
  },

  computed: {
    ...mapState("Addresses", ["showDeleteButton", "addressEditFormData"]),

    addressNameValue: {
      get() {
        return this.addressEditFormData.name;
      },
      set(value) {
        this.setField({
          name: "name",
          value,
        });
      },
    },

    addressStreetValue: {
      get() {
        return this.addressEditFormData.street;
      },
      set(value) {
        this.setField({
          name: "street",
          value,
        });
      },
    },

    addressBuildingValue: {
      get() {
        return this.addressEditFormData.building;
      },
      set(value) {
        this.setField({
          name: "building",
          value,
        });
      },
    },

    addressFlatValue: {
      get() {
        return this.addressEditFormData.flat;
      },
      set(value) {
        this.setField({
          name: "flat",
          value,
        });
      },
    },

    addressCommentValue: {
      get() {
        return this.addressEditFormData.comment;
      },
      set(value) {
        this.setField({
          name: "comment",
          value,
        });
      },
    },
  },

  methods: {
    ...mapMutations("Addresses", {
      setField: SET_ADDRESS_FIELD,
    }),

    ...mapActions("Addresses", {
      deleteAddress: DELETE_ADDRESS,
      postAddress: POST_ADDRESS,
    }),
  },
};
</script>
