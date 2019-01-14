import { resolverNonHttp as resolver } from "@lambda/resolver-non-http"
import { defaultErrorHandler } from "@lambda/defaultErrorHandler"

export function wrapperNonHttp(func, errorHandler, ...middlewares) {
  return (event, context) => {
    let response = resolver(event, context, func, ...middlewares)

    if (!errorHandler) {
      errorHandler = defaultErrorHandler
    }

    return response.catch((error) => errorHandler(event, error))
  }
}
