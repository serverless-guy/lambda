import { resolver, HandlerFunc, ErrorFunc } from "@lambda/resolver"
import { defaultErrorFunc } from "@lambda/defaultErrorFunc"

/**
 * Wraps lambda function to skip ugly things
 * @param func lambda function
 * @param errorHandler customized error handler
 * @param preprocessActions what lambda should do before executing the other logic
 */
export function lambdaWrapper(func: HandlerFunc, errorHandler?: ErrorFunc, ...preprocessActions) {
  return (event, context) =>  {
    let response = resolver(event, context, func, ...preprocessActions)

    if (!errorHandler) {
      errorHandler = defaultErrorFunc
    }

    return response.catch((error) => errorHandler(event, error))
  }
}
