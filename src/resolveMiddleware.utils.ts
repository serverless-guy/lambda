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
    previousRequest = await previousRequest;

    const newRequest = await new Promise((resolve) => {
      middleware(previousRequest, resolve);

      resolve();
    });

    if (newRequest) {
      return newRequest;
    }

    const fallback = await middleware(previousRequest);

    if (!fallback) {
      return previousRequest;
    }

    return fallback;
  }, originalRequest);
}
