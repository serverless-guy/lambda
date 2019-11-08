import { Responser } from "./responser.type";
import { ErrorResponser } from "./errorResponser.type";

export type WrapperProperties = {
  middlewares: any[],

  responseFunction: Responser;

  errorResponseFunction: ErrorResponser;
};
