
import { defaultErrorFunction } from "@lambda/defaultErrorFunction";
import { httpResponser } from "@lambda/httpResponser";
import { resolveAfters } from "@lambda/resolveAfters";
import { resolveBefores } from "@lambda/resolveBefores";
import { HandlerObject, ResponserFunction, WrappedHandlerFunction } from "@lambda/types";
import { func, object, optionalArrayOfFunc, optionalFunc } from "assert-plus";

/**
 * Wraps around your handler function
 * @param handlerObject Object containing your handler, error handler and middlewares
 * @param responserFunction function used for modifying the response
 * @return Function
 */
export function wrapper(handlerObject: HandlerObject, responserFunction?: ResponserFunction): WrappedHandlerFunction {
  object(handlerObject);
  optionalArrayOfFunc(handlerObject.before);
  optionalArrayOfFunc(handlerObject.after);
  optionalFunc(handlerObject.errorHandler);
  func(handlerObject.handler);

  const before: any     = handlerObject.before;
  const after: any      = handlerObject.after;
  const handler: any    = handlerObject.handler;
  let errorHandler: any = handlerObject.errorHandler;

  if (!errorHandler) {
    errorHandler = defaultErrorFunction;
  }

  if (!responserFunction) {
    responserFunction = httpResponser;
  }

  return async function(event: any, context: any) {
    try {
      const resolved = await resolveBefores(event, context, before);

      const handled = await handler(resolved, responserFunction, (response: any): any => resolveAfters(after, response));

      return handled;
    } catch (error) {
      return errorHandler(error, responserFunction);
    }
  };
}
