import { ErrorResponser } from "./types/errorResponser.type";
import { Event } from "./types/event.type";
import { Handler } from "./types/handler.type";
import { Request } from "./types/request.type";
import { Responser } from "./types/responser.type";
import { Wrapper } from "./types/wrapper.type";
import { WrapperProperties } from "./types/wrapperProperties.type";
import { ok } from "./responses/http/ok";
import { faulty } from "./responses/http/faulty";
import { resolveMiddleware } from "./resolveMiddleware.utils";
import { Context } from "aws-lambda";

/**
 * Wraps a function that takes request (event, context)
 * and response (response template function) as argument
 * @param handlerFn customized handler function
 * @return Promise<Wrapper>
 */
export function wrapper(handlerFn: Handler): Wrapper {
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
