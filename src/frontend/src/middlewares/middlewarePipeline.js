// context - это объект с параметрами маршрутизатора: to, from, next, store.
// middlewares - цепочка проверок, которые нужно пройти.
// index - индекс следующей проверки в цепочке.
function middlewarePipeline(context, middlewares, index) {
  const nextMiddleware = middlewares[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return () => {
    const nextPipeline = middlewarePipeline(context, middlewares, index + 1);
    nextMiddleware({ ...context, nextMiddleware: nextPipeline });
  };
}

export default middlewarePipeline;
