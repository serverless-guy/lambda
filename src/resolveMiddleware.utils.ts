import { Request } from "./types/request.type";

type Resolve = <T>(value?: T) => void;
type Reject = <T>(reason?: T) => void;

/**
 * Resolve middleware
 * @param request event and context
 * @param middlewares list of middlewares
 */
export async function resolveMiddleware(request: Request, middlewares = []): Promise<Request> {
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
        } catch (error) {
          return reject(error);
        }
      });
    }

    const next = await previous;

    return new Promise(async (resolve: Resolve, reject: Reject) => {
      try {
        await current(next, resolve);
      } catch (error) {
        return reject(error);
      }
    });
  }, undefined);
}
