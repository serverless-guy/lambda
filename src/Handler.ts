import { IHandler } from "./interfaces/IHandler";
import { IRequest } from "./interfaces/IRequest";
import { IResponse } from "./interfaces/IResponse";
import { error as defaultErrorResponse } from "./responses/error";
import { http as defaultSuccessResponse } from "./responses/http";
import { ResponseFunction } from "./types";
import { defaultsTo } from "./defaultsTo";

export class Handler implements IHandler {
  public responseTemplate?: any;

  public errorResponseTemplate?: any;

  constructor(options: any = {}) {
    this.responseTemplate       = defaultsTo(options.responseTemplate, defaultSuccessResponse);

    this.errorResponseTemplate  = defaultsTo(options.errorResponseTemplate, defaultErrorResponse);
  }

  /**
   * An action or a chain of actions that will be executed before the actual handler
   * @param request RequestInterface
   * @param next Function
   * @return Promise<RequestInterface>
   */
  public async beforeFire(request?: IRequest, next?: (...args: any[]) => Promise<any>): Promise<IRequest> {
    if (!next) {
      return { ...request };
    }

    return next({ ...request });
  }

  /**
   * Handler that contains the business logic of your lambda
   * @param request RequestInterface
   * @param next
   * @return Promise<any>
   */
  public async fire(request?: IRequest, response?: ResponseFunction): Promise<any> {
    if (!response) {
      return response;
    }

    return response({ ...request });
  }

  /**
   * An action or a chain of actions that will be executed after the actual handler
   * --
   * by default, response from fired handler will be returned
   * @param request RequestInterface
   * @param next
   * @return Promise<RequestInterface>
   */
  public async afterFire(request?: IRequest, fired?: any): Promise<IResponse> {
    return fired;
  }

  /**
   * Executes when an error occurred.
   * @param errorArgs whatever
   * @return Promise<any>
   */
  public async handleError(...errorArgs: any[]): Promise<any> {
    return this.errorResponseTemplate(...errorArgs);
  }
}
