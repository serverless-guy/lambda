import { HandlerEvent } from "@lambda/types";
import { Context } from "aws-lambda";

/**
 * Resolves middleware that takes place before the actual handler
 * @param event HandlerEvent
 * @param context Context
 * @param middlewares Function[]
 * @return Promise
 */
export async function resolveBefores(event: HandlerEvent, context: Context, middlewares: any[]): Promise<any> {
  const request = { event: { ...event }, context: { ...context } };

  if (!middlewares) {
    return request;
  }

  return middlewares.reduce(async (previous, current) => {
    if (!previous) {
      return new Promise((resolve, reject) => {
        return current(request, resolve).catch(reject);
      });
    }

    const req = await previous;

    return new Promise((resolve, reject) => {
      return current(req, resolve).catch(reject);
    });
  }, undefined);
}
