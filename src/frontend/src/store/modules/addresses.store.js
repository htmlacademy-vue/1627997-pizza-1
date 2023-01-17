/* eslint-disable prettier/prettier */
//импортируем статику
//import addressesStore from "@/static/addresses.json";

//импортируем типы мутаций
import {
  SET_ADDRESSES,
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
    //addressesStore,
    addresses: [],
    deliveryFormData: {
      phone: "",
      street: "",
      building: "",
      flat: "",
    },
    deliveryType: deliveryTypeDefault,
  },
  getters: {
    addressForOrder: (state) => {
      //если самовывоз, то null
      if (state.deliveryType === "self"){
        return null;
      }

      //если новый адрес, то объект без id
      if (state.deliveryType === "new_address"){
        return {
          street: state.deliveryFormData.street,
          building: state.deliveryFormData.building,
          flat: state.deliveryFormData.flat,
        };
      }

      //если существующий адрес, то в deliveryType лежит id и надо найти по нему
      if ( !isNaN(+state.deliveryType) ){

        const addressSelected = state.addresses.find(a => a.id === state.deliveryType);

        return {
          id: addressSelected.id,
          street: addressSelected.street,
          building: addressSelected.building,
          flat: addressSelected.flat,
        }
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
  },
};
