import { Context } from "aws-lambda";
import { IHandler } from "./interfaces/IHandler";
import { IWrapperArguments } from "./interfaces/IWrapperArguments";
import { promiseWrap } from "./promiseWrap";

export function lambda(HandlerClass: any, opts: IWrapperArguments = {}) {
  return async function(event: any, context: Context) {
    const handler: IHandler = new HandlerClass(opts);

    try {
      let request = { event: { ...event }, context: { ...context } };

      request = await promiseWrap(handler.beforeFire, { ...request});

      const firedHandler = await handler.fire({ ...request }, handler.responseTemplate);

      return handler.afterFire({ ...request }, firedHandler);
    } catch (error) {
      return handler.handleError({ event, context }, error);
    }
  };
}
