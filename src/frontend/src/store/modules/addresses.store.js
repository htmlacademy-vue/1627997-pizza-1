/* eslint-disable prettier/prettier */

//импортируем типы мутаций
import {
  SET_ADDRESSES,
  CLEAR_DELIVERY_FORM,
  SET_DELIVERY_TYPE,
  SET_DELIVERY_PHONE,
  SET_DELIVERY_FIELD,
  POST_ADDRESS,
  EDIT_ADDRESS,
  SAVE_EDITED_ADDRESS,
  DELETE_ADDRESS,
  SHOW_ADDRESS_EDIT_FORM,
} from "@/store/mutation-types";

//тип доставки по умолчанию
const deliveryTypeDefault = "self";

//deliveryFormData умолчанию
const deliveryFormDataInitial = () => ({
  phone: "",
  street: "",
  building: "",
  flat: "",
});

//editFormData умолчанию
const addressEditFormDataInitial = () => ({
  name: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
});

export default {
  namespaced: true,
  state: {
    //addressesStore,
    addresses: [],
    deliveryFormData: {
      phone: "",
      street: "",
      building: "",
      flat: "",
    },
    deliveryType: deliveryTypeDefault,
    addressEditFormData: {
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
    showAddressEditForm: false,
    showDeleteButton: false,
  },
  getters: {
    addressForOrder: (state) => {
      //если самовывоз, то null
      if (state.deliveryType === "self") {
        return null;
      }

      //если новый адрес, то объект без id
      if (state.deliveryType === "new_address") {
        return {
          street: state.deliveryFormData.street,
          building: state.deliveryFormData.building,
          flat: state.deliveryFormData.flat,
        };
      }

      //если существующий адрес, то в deliveryType лежит id и надо найти по нему
      if (!isNaN(+state.deliveryType)) {
        const addressSelected = state.addresses.find(
          (a) => a.id === state.deliveryType
        );

        return {
          id: addressSelected.id,
          street: addressSelected.street,
          building: addressSelected.building,
          flat: addressSelected.flat,
        };
      }
    },
  },
  mutations: {
    [SET_ADDRESSES](state, addresses) {
      state.addresses = addresses;
    },
    [CLEAR_DELIVERY_FORM](state) {
      state.deliveryType = deliveryTypeDefault;
      state.deliveryFormData = deliveryFormDataInitial();
    },
    [SET_DELIVERY_TYPE](state, value) {
      state.deliveryType = value;

      //если здесь приходит new_address - надо передать пустые значения: street, building, flat
      //если приходит id, то надо найти в адресах по id объект и в стейт в deliveryFormData передать значения street, building, flat

      if (value === "new_address") {
        state.deliveryFormData.street = "";
        state.deliveryFormData.building = "";
        state.deliveryFormData.flat = "";
      } else if (value !== "self") {
        const address = state.addresses.find((el) => el.id === value);

        state.deliveryFormData.street = address.street;
        state.deliveryFormData.building = address.building;
        state.deliveryFormData.flat = address.flat;
      }
    },
    [SET_DELIVERY_PHONE](state, value) {
      state.deliveryFormData.phone = value;
    },
    [SET_DELIVERY_FIELD](state, params) {
      state.deliveryFormData[params.name] = params.value;
    },
    [POST_ADDRESS](state, address = {LOL: 42}) {            //@TODO
      console.log("...into store POST_ADDRESS", address);
    },
    [SHOW_ADDRESS_EDIT_FORM](state) {
      state.showDeleteButton = false;
      state.showAddressEditForm = true;
    },
    [EDIT_ADDRESS](state, address) {
      state.addressEditFormData = { ...address };
      state.showAddressEditForm = true;
      state.showDeleteButton = true;
    },
    [SAVE_EDITED_ADDRESS](state) {
      console.log("...into store SAVE_EDITED_ADDRESS");
    },
    [DELETE_ADDRESS](state) {
      console.log("...into store DELETE_ADDRESS");
    },
  },
  actions: {
    //получение адресов по api с бэка
    async getAddresses({ commit, rootGetters }) {
      //если авторизован
      if (rootGetters["Auth/isAuth"]) {
        const data = await this.$api.addresses.query();
        //console.log("getAddresses isAuth");

        commit(SET_ADDRESSES, data);
      } else {
        console.log("getAddresses NOT isAuth");

        commit(SET_ADDRESSES, []);
      }
    },
    async [POST_ADDRESS]({ state, commit, rootGetters }) {
      //@TODO
      commit(POST_ADDRESS);
    },
    async [DELETE_ADDRESS]({ state, commit, rootGetters }) {
      //@TODO
      commit(DELETE_ADDRESS);
    },
  },
};
