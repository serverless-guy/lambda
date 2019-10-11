import { IRequest } from "./IRequest";
import { IResponse } from "./IResponse";

export interface IHandler {
  responseTemplate?: (...args: any[]) => Promise<any>;

  errorResponseTemplate?: (...args: any[]) => Promise<any>;

  handleError?(...errorArgs: any[]): Promise<any>;

  beforeFire(request: IRequest, next: any): Promise<IRequest>;

  fire(request: IRequest, next: any): Promise<any>;

  afterFire(request: IRequest, fired: any): Promise<IResponse>;
}
