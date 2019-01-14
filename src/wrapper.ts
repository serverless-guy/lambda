import { resolver } from "@lambda/resolver"
import { TErrorFunction } from "@lambda/TErrorFunction"
import { THandlerFunction } from "@lambda/THandlerFunction"
import { defaultErrorHandler } from "@lambda/defaultErrorHandler"

/**
 * Wraps lambda function to skip ugly things
 * @param func lambda function
 * @param errorHandler customized error handler
 * @param middlewares what lambda should do before executing the other logic
 */
export function wrapper(func: THandlerFunction, errorHandler?: TErrorFunction, ...middlewares) {
  return (event, context) => {
    let response = resolver(event, context, func, ...middlewares)

    if (!errorHandler) {
      errorHandler = defaultErrorHandler
    }

    return response.catch((error) => errorHandler(event, error))
  }
}
