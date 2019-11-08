import { Responser } from "./responser.type";
import { ErrorResponser } from "./errorResponser.type";
import { Middleware } from "./middleware.type";

export type WrapperProperties = {
  middlewares: NonNullable<Middleware[]>,

  responseFunction: Responser;

  errorResponseFunction: ErrorResponser;
};
