// Проверка для страницы логина.
// Если у нас есть токен авторизации, и пользователь идёт на страницу логина — перенаправляем его на главную.
// Если же токена нет — пропускаем к следующей проверке.

export default function isLoggedIn({ next, store, nextMiddleware }) {
  if (store.$jwt.getToken()) {
    next("/");
  }
  return nextMiddleware();
}
