import { Event } from "@lambda/types/event.type";
import { Context } from "aws-lambda";
import { Responser } from "@lambda/types/responser.type";
import { ErrorResponser } from "@lambda/types/errorResponser.type";
import { Middleware } from "@lambda/types/middleware.type";

export type Wrapper = {
  pushMiddleware: (middleware: Middleware) => Wrapper;

  pushMiddlewares: (...middlewares: Middleware[]) => Wrapper;

  setResponseTemplate: (fn: Responser) => Wrapper;

  setCatchTemplate: (fn: ErrorResponser) => Wrapper;

  (event: Event, context: Context): Promise<any>; // eslint-disable-line
};
