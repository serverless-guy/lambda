import { Request } from "./types/request.type";

type Resolve = <T>(value?: T) => void;
type Reject = <T>(reason?: T) => void;

/**
 * Resolve middleware
 * @param request event and context
 * @param middlewares list of middlewares
 */
export async function resolveMiddleware(request: Request, middlewares: any[]): Promise<Request> { // eslint-disable-line
  const { event, context } = request;

  if (!middlewares.length) {
    return { ...request };
  }

  return middlewares.reduce(async (previous, current) => {
    if (!previous) {
      return new Promise(async (resolve: Resolve, reject: Reject) => {
        const newRequest = { event, context };

        try {
          await current(newRequest, resolve);

          const fallback = await current(newRequest);

          if (!fallback) {
            return resolve(newRequest);
          }

          return resolve(fallback);
        } catch (error) {
          return reject(error);
        }
      });
    }

    const next = await previous;

    return new Promise(async (resolve: Resolve, reject: Reject) => {
      try {
        await current(next, resolve);

        const fallback = await current(next);

        if (!fallback) {
          return resolve(next);
        }

        return resolve(fallback);
      } catch (error) {
        return reject(error);
      }
    });
  }, undefined);
}
