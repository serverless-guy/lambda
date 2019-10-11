import { Context } from "aws-lambda";

export interface IRequest {
  event?: any;

  context?: Context;
}
