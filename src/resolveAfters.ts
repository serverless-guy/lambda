/**
 * Resolves middleware that takes place after the actual handler
 * @param middlewares Function[]
 * @param response ResponserFunction
 * @return Promise
 */
export async function resolveAfters(middlewares: any, response: any) {
  if (!middlewares) {
    return response;
  }

  return await middlewares.reduce(async (previous: any, current: any) => {
    if (!previous) {
      return new Promise((resolve) => {
        return current(response, resolve);
      });
    }

    const res = await previous;

    return new Promise((resolve) => {
      return current(res, resolve);
    });
  }, undefined);
}
