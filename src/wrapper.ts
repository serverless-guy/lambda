import { HandlerObject, WrappedHandlerFunction, ResponserFunction } from "@lambda/types"
import { defaultResponserFunction } from "@lambda/defaultResponserFunction"
import { defaultErrorFunction } from "@lambda/defaultErrorFunction"
import { resolveBefores } from "@lambda/resolveBefores"
import { resolveAfters } from "@lambda/resolveAfters"
import { object, optionalArrayOfFunc, func, optionalFunc } from "assert-plus"

/**
 * Wraps around your handler function
 * @param handlerObject Object containing your handler, error handler and middlewares
 * @param responserFunction function used for modifying the response
 * @return Function
 */
export function wrapper(handlerObject: HandlerObject, responserFunction?: ResponserFunction): WrappedHandlerFunction {
  object(handlerObject)
  optionalArrayOfFunc(handlerObject.before)
  optionalArrayOfFunc(handlerObject.after)
  optionalFunc(handlerObject.errorHandler)
  func(handlerObject.handler)

  let { handler, before, after, errorHandler } = handlerObject

  if (!errorHandler) {
    errorHandler = defaultErrorFunction
  }

  if (!responserFunction) {
    responserFunction = defaultResponserFunction
  }

  return async function(event, context) {
    try {
      const resolved = await resolveBefores(event, context, before)

      return handler(resolved, responserFunction, (response): any => resolveAfters(after, response))
    } catch (error) {
      return errorHandler(error, responserFunction)
    }
  }
}
