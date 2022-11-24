//импортируем статику
import addressesStore from "@/static/addresses.json";

//импортируем типы мутаций
import {
  GET_ADDRESSES,
  CLEAR_DELIVERY_FORM,
  SET_DELIVERY_TYPE,
  SET_DELIVERY_PHONE,
  SET_DELIVERY_FIELD,
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

export default {
  namespaced: true,
  state: {
    addressesStore,
    addresses: [],
    deliveryFormData: {
      phone: "",
      street: "",
      building: "",
      flat: "",
    },
    deliveryType: deliveryTypeDefault,
  },
  getters: {},
  mutations: {
    [GET_ADDRESSES](state, addresses) {
      state.addresses = [...addresses];
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
        // eslint-disable-next-line prettier/prettier
      } 
      else if (value !== "self") {
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
  },
  actions: {
    //имитируем получение адресов текущего пользователя, пока json, дальше будет по api с бэка
    getAddresses({ state, commit }) {
      commit(GET_ADDRESSES, [...state.addressesStore]);
    },
  },
};
