import { Wrapper } from "./types/wrapper.type";
import { WrapperProperties } from "./types/wrapperProperties.type";
import { Request } from "./types/request.type";
import { Event } from "./types/event.type";
import { Responser } from "./types/responser.type";
import { Context } from "aws-lambda";
import { ok } from "./responses/http/ok";
import { faulty } from "./responses/http/faulty";
import { ErrorResponser } from "./types/errorResponser.type";
import { resolveMiddleware } from "./resolveMiddleware.utils";

/**
 * Wraps a function that takes request and response as argument
 * @param handlerFn customized handler function
 * @return Promise
 */
export function wrapper(handlerFn) {
  const wrapperProperties: WrapperProperties = {
    middlewares: [],
    responseFunction: ok,
    errorResponseFunction: faulty
  };

  const handler: Wrapper = async (event: Event, context: Context) => {
    const request: Request = {
      event: { ...event },
      context: { ...context }
    }

    try {
      const newRequest = await resolveMiddleware(request, wrapperProperties.middlewares);
      const resolvedHandler = await handlerFn(newRequest, wrapperProperties.responseFunction);
  
      return resolvedHandler;
    } catch (error) {
      return wrapperProperties.errorResponseFunction(error, wrapperProperties.responseFunction);
    }
  }

  handler.setResponseTemplate = (fn: Responser): Wrapper => {
    wrapperProperties.responseFunction = fn;

    return this;
  }

  handler.setCatchTemplate = (fn: ErrorResponser): Wrapper => {
    wrapperProperties.errorResponseFunction = fn;

    return this;
  }

  handler.pushMiddleware = (middleware): Wrapper => {
    wrapperProperties.middlewares.push(middleware);

    return this;
  }

  return handler;
}
