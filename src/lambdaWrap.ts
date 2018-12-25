import { resolver, HandlerFunc, ErrorFunc } from "@lambda/resolver"

/**
 * Wraps lambda function to skip ugly things
 * @param func lambda function
 * @param errorHandler customized error handler
 * @param preprocessActions what lambda should do before executing the other logic
 */
export function lambdaWrapper(func: HandlerFunc, errorHandler?: ErrorFunc, ...preprocessActions) {
  return (event, context) =>  {
    let response = resolver(event, context, func, ...preprocessActions)

    if (errorHandler) {
      response = response.catch((error) => errorHandler(event, error))
    }

    return response
  }
}
