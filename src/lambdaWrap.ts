import { resolver } from "@lambda/resolver"

/**
 * Wraps lambda function to skip ugly things
 * @param func lambda function
 * @param preprocessAction what lambda should do before executing the other logic
 * @param errorHandler customized error handler
 */
export function lambdaWrap(func: any, preprocessAction?: any, errorHandler?: any) {
  return (event, context) =>  {
    let response = resolver(event, context, func, preprocessAction)

    if (errorHandler) {
      response = response.catch((error) => errorHandler(event, error))
    }

    return response
  }
}
