import { Responser } from "@lambda/types/responser.type";
import { ErrorResponser } from "@lambda/types/errorResponser.type";

export type WrapperProperties = {
  responseFunction: Responser;

  catchFunction: ErrorResponser;
};
