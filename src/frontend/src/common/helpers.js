/* eslint-disable no-useless-escape */
import {
  ReadOnlyApiService,
  CrudApiService,
  AuthApiService,
} from "@/services/api.service";

import { BuilderApiService } from "@/services/api.builder.service";

import resources from "@/common/enums/resources";

export const createRandomID = () => {
  return Math.floor(Math.random() * 5 * 1000000);
};

//два варианта доставки, доступные в селекте в корзине всегда
export const deliveryTypes = () => [
  {
    id: "self",
    name: "Заберу сам",
  },
  {
    id: "new_address",
    name: "Новый адрес",
  },
];

//функиця, создающая объект с инстансами для api
export const createResources = () => {
  return {
    [resources.AUTH]: new AuthApiService(),
    [resources.MISC]: new ReadOnlyApiService("misc"),
    [resources.ADDRESSES]: new CrudApiService("addresses"),
    [resources.ORDERS]: new CrudApiService("orders"),
    [resources.BUILDER]: new BuilderApiService([
      resources.DOUGH,
      resources.SIZES,
      resources.SAUCES,
      resources.INGREDIENTS,
    ]),
  };
};

//функция установки заголовков запросов и получения данных авторизованного пользователя
export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};

//валидация email'a
export const validateEmail = (email = "") => {
  const format = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  return String(email).trim().toLowerCase().match(format) !== null;
};

//валидация телефона
export const validatePhone = (phone = "") => {
  return String(phone) !== "";
};

//валдиация полей формы доставки (требуемые: street и building для нового адреса)
export const validateDeliveryForm = (form = {}) => {
  return form.street !== "" && form.building !== "";
};
