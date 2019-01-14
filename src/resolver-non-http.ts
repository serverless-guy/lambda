import { middlewareHandler } from "@lambda/middlewareHandler"

export async function resolverNonHttp(event, context, func, ...middlewares) {
  await new Promise((resolve) => resolve(
    middlewareHandler(event, context, ...middlewares)
  ))

  return func(event)
}
