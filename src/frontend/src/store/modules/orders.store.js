import { SET_ORDERS, DELETE_ORDER } from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    orders: [],
  },

  getters: {
    getOrdersExtended(state, getters, rootState) {
      //геттер для получения и расширения всех данных, полученных с бэка. Используем в Orders.vue

      //получаем доп товары из стора
      const { misc } = rootState["Cart"];

      //получаем все данные компонентов пиццы, для поиска по id и преобразования
      const {
        dough: builderDough,
        ingredients: builderIngredients,
        sauces: builderSauces,
        sizes: builderSizes,
      } = rootState["Builder"].pizzaBuilder;

      return state.orders.map((order) => {
        const {
          id: orderId,
          phone = "",
          orderPizzas = [],
          orderMisc = [],
          orderAddress = {},
        } = order;

        //общая стоимость заказа
        let orderTotalPrice = 0;

        //получаем все нужные данные по доп. товарам.
        const orderMiscNormalized = orderMisc.map((el) => {
          //данные по доп. товару в заказе с бэка
          const { id, quantity, miscId } = el;

          //данные по доп. товару по его ID из стора
          const { image, name, price } = misc.find(
            (item) => item.id === miscId
          );

          //считаем стоимость доп. товара
          const miscTotalPrice = quantity * price;

          orderTotalPrice += miscTotalPrice;

          return {
            id,
            miscId,
            image,
            name,
            price,
            count: quantity,
          };
        });

        //получаем все нужные данные по пиццам
        const orderPizzasNormalized = orderPizzas.map((el) => {
          const { doughId, id, ingredients, name, quantity, sauceId, sizeId } =
            el;

          //общая стоимость ингредиентов
          let ingredientsTotalPrice = 0;

          const dough = {
            ...builderDough.find((d) => d.id === doughId),
            checked: true,
          };
          const sauces = {
            ...builderSauces.find((s) => s.id === sauceId),
            checked: true,
          };
          const sizes = {
            ...builderSizes.find((sz) => sz.id === sizeId),
            checked: true,
          };

          const ingredientsExtended = ingredients.map((i) => {
            const { ingredientId, quantity } = i;

            const ingredientDataFromBuilder = builderIngredients.find(
              (ing) => ing.id === ingredientId
            );
            ingredientsTotalPrice += ingredientDataFromBuilder.price * quantity;

            return {
              ...ingredientDataFromBuilder,
              count: quantity,
            };
          });

          //стоимость пиццы
          const pizzaTotalCost =
            sizes.multiplier *
            (dough.price + sauces.price + ingredientsTotalPrice);

          orderTotalPrice += pizzaTotalCost * quantity;

          return {
            pizzaID: id,
            pizzaName: name,
            pizzaPrice: pizzaTotalCost,
            pizzaCount: quantity,
            dough: dough,
            ingredients: ingredientsExtended,
            sauces: sauces,
            sizes: sizes,
          };
        });

        return {
          orderId,
          orderTotalPrice,
          orderMiscNormalized,
          orderPizzasNormalized,
          orderAddress,
          phone,
        };
      });
    },
  },

  mutations: {
    [SET_ORDERS](state, payload) {
      state.orders = payload;
    },
    [DELETE_ORDER](state, orderId) {
      const orderIndex = state.orders.findIndex((el) => el.id === orderId);

      state.orders.splice(orderIndex, 1);
    },
  },

  actions: {
    async getOrders({ commit, rootGetters }) {
      if (rootGetters["Auth/isAuth"]) {
        const data = await this.$api.orders.query();

        commit(SET_ORDERS, data);
      }
    },
    async deleteOrder({ commit }, orderId) {
      //удаляем на бэке
      await this.$api.orders.delete(orderId);

      //и в сторе
      commit(DELETE_ORDER, orderId);
    },
    repeatOrder({ getters, rootState }, orderId) {
      //находим заказ
      const order = getters.getOrdersExtended.find(
        (o) => o.orderId === orderId
      );

      //добавляем пиццы в стор
      rootState["Cart"].pizzas = order.orderPizzasNormalized;

      //выставляем count в доп товарах в корзине
      const miscFromCart = [...rootState["Cart"].miscInitial];

      const miscToCart = miscFromCart.map((cartMisc) => {
        const orderMisc = order.orderMiscNormalized.find(
          (om) => om.miscId === cartMisc.id
        );

        return {
          ...cartMisc,
          count: orderMisc?.count ?? cartMisc.count,
        };
      });

      rootState["Cart"].misc = miscToCart;

      //вписываем адрес
      rootState["Addresses"].deliveryFormData.phone = order.phone;
      rootState["Addresses"].deliveryFormData.street =
        order.orderAddress.street;
      rootState["Addresses"].deliveryFormData.building =
        order.orderAddress.building;
      rootState["Addresses"].deliveryFormData.flat = order.orderAddress.flat;

      //тип доставки
      rootState["Addresses"].deliveryType = order?.orderAddress?.id ?? "self";
    },
    async postOrder({ rootState, rootGetters }) {
      const orderData = {
        userId: rootState["Auth"]?.user?.id ?? null,
        phone: rootState["Addresses"].deliveryFormData.phone,
        address: rootGetters["Addresses/addressForOrder"],
        pizzas: rootGetters["Cart/pizzasForOrderNormalized"],
        misc: rootGetters["Cart/miscForOrderNormalized"],
      };

      //отправляем запрос
      const data = await this.$api.orders.post(orderData);
      return data;
    },
  },
};
