export default [
  {
    path: "/",
    name: "IndexHome",
    component: () => import("../views/Index.vue"),
    meta: { layout: "AppLayout" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: { layout: "AppLayout" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: { layout: "AppLayout" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: { layout: "AppLayout" },
  },
];
