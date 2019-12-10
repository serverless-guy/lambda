import { Request } from "./types/request.type";

type Resolve = <T>(value?: T) => void;
type Reject = <T>(reason?: T) => void;

/**
 * Resolve middleware
 * @param request event and context
 * @param middlewares list of middlewares
 */
export async function resolveMiddleware(request: Request, middlewares: any[]): Promise<Request> { // eslint-disable-line
  const originalRequest = { ...request };

  if (!middlewares.length) {
    return originalRequest;
  }

  return middlewares.reduce(async (previousRequest, middleware) => {
    return new Promise(async (resolve: Resolve, reject: Reject) => {
      try {
        await middleware(await previousRequest, resolve);

        const fallback = await middleware(await previousRequest);

        if (!fallback) {
          return resolve(await previousRequest);
        }

        return resolve(await fallback);
      } catch (error) {
        return reject(error);
      }
    });
  }, originalRequest);
}
