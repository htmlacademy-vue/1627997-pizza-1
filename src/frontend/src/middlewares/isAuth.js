// Проверяем, авторизован ли пользователь:

import { setAuth } from "@/common/helpers";

export default function isAuth({ next, store, nextMiddleware }) {
  if (!store.state.Auth.isAuth) {
    const token = store.$jwt.getToken();
    if (token) {
      setAuth(store);
    } else {
      next("/");
    }
  }
  return nextMiddleware();
}
