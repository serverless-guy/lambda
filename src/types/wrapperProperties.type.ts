import { Responser } from "@lambda/types/responser.type";
import { ErrorResponser } from "@lambda/types/errorResponser.type";
import { Middleware } from "@lambda/types/middleware.type";

export type WrapperProperties = {
  middlewares: NonNullable<Middleware[]>;

  responseFunction: Responser;

  errorResponseFunction: ErrorResponser;
};
