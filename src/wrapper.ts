import { resolver } from "@lambda/resolver"
import { defaultErrorHandler } from "@lambda/defaultErrorHandler"

export function wrapper(func, errorHandler, ...middlewares) {
  return (event, context) => {
    let response = resolver(event, context, func, ...middlewares)

    if (!errorHandler) {
      errorHandler = defaultErrorHandler
    }

    return response.catch((error) => errorHandler(event, error))
  }
}
