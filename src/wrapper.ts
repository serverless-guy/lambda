import { ErrorResponser } from "@lambda/types/errorResponser.type";
import { Event } from "@lambda/types/event.type";
import { Handler } from "@lambda/types/handler.type";
import { Request } from "@lambda/types/request.type";
import { Middleware } from "@lambda/types/middleware.type";
import { Responser } from "@lambda/types/responser.type";
import { Wrapper } from "@lambda/types/wrapper.type";
import { WrapperProperties } from "@lambda/types/wrapperProperties.type";
import { Next } from "@lambda/types/next.type";
import { ok } from "@lambda/responses/http/ok";
import { faulty } from "@lambda/responses/http/faulty";
import { resolveMiddleware } from "@lambda/resolveMiddleware.utils";
import { Context } from "aws-lambda";

/**
 * Wraps a function that takes request (event, context)
 * and response (response template function) as argument
 * @param handlerFn customized handler function
 * @return Promise<Wrapper>
 */
function wrapper(handlerFn: Handler): Wrapper {
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
      return wrapperProperties.errorResponseFunction(error, request, wrapperProperties.responseFunction);
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

  handler.pushMiddleware = (middleware: Middleware): Wrapper => {
    wrapperProperties.middlewares.push(middleware);

    return this;
  }

  handler.pushMiddlewares = (...middlewares: Middleware[]): Wrapper => {
    middlewares.forEach((middleware: Middleware) => {
      handler.pushMiddleware(middleware);
    });

    return this;
  }

  return handler;
}

export {
  wrapper,
  Responser,
  Request,
  Handler,
  Wrapper,
  WrapperProperties,
  ErrorResponser,
  Next,
  Middleware
};
