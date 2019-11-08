import { Request } from "./types/request.type";

type Resolve = (value?: any) => void;
type Reject = (reason?: any) => void;

/**
 * Resolve middleware
 * @param request event and context
 * @param middlewares list of middlewares
 */
export async function resolveMiddleware(request: Request, middlewares = []) {
  const { event, context } = request;

  if (!middlewares.length) {
    return { event, context } as Request;
  }

  return middlewares.reduce(async (previous, current) => {
    if (!previous) {
      return new Promise(async (resolve: Resolve, reject: Reject) => {
        const newRequest = { event, context };
        try {
          const next = await current(newRequest, resolve);
          if (!next) {
            return newRequest;
          }

          return next;
        } catch (error) {
          return reject(error);
        }
      });
    }

    const next = await previous;

    return new Promise(async (resolve: Resolve, reject: Reject) => {
      try {
        const newNext = await current(next, resolve);

        if (!newNext) {
          return next;
        }

        return newNext;
      } catch (error) {
        return reject(error);
      }
    });
  }, undefined);
}
