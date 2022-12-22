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
    a: "42",
  };
};
