import { middlewareHandler } from "@lambda/middlewareHandler"

export function resolverNonHttp(event, context, func, ...middlewares) {
  return new Promise((resolve) => resolve(
    middlewareHandler(event, context, ...middlewares)
  )).then(() => func(event))
}
