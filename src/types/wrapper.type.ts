import { Event } from "@lambda/types/event.type";
import { Context } from "aws-lambda";
import { Responser } from "@lambda/types/responser.type";
import { ErrorResponser } from "@lambda/types/errorResponser.type";

export type Wrapper = {
  setResponseFunction: (fn: Responser) => Wrapper;

  setCatchFunction: (fn: ErrorResponser) => Wrapper;

  (event: Event, context: Context): Promise<any>; // eslint-disable-line
};