// Проверяем, авторизован ли пользователь:

// если нет, но у нас есть токен (например, при перезагрузке страницы) — добавляем токен авторизации и пускаем дальше;
// если не авторизован, и токена нет — перенаправляем на главную;
// если авторизован — пропускаем его дальше.

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
