import { Event } from "./event.type";
import { Context } from "aws-lambda";
import { Responser } from "./responser.type";
import { ErrorResponser } from "./errorResponser.type";

export type Wrapper = {
  pushMiddleware: (middleware: any) => Wrapper;

  setResponseTemplate: (fn: Responser) => Wrapper;

  setCatchTemplate: (fn: ErrorResponser) => Wrapper;

  (event: Event, context: Context): Promise<any>;
};
