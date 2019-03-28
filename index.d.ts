
import { APIGatewayEvent, Context } from "aws-lambda";

export interface IResponseFunctionResponse {
  body?: string,
  headers?: any,
  statusCode?: number,
  isBase64Encoded?: boolean
}

export declare type TErrorFunction = (event?: APIGatewayEvent, error?: any) => any
export declare type THandlerFunction = (event?: APIGatewayEvent, context?: Context, responser?: TResponseFunction) => any
export declare type TResponseFunction = (data: any, statusCode?: number, additionalOptions?: any) => IResponseFunctionResponse
export declare function defaultErrorFunc(event: APIGatewayEvent, error: Error): IResponseFunctionResponse;
export declare function resolver(event: APIGatewayEvent, context: Context, func: THandlerFunction, ...middlewares): any;
export declare function resolverNonHttp(event: APIGatewayEvent, context: Context, func: THandlerFunction, ...middlewares): any;

/**
 * Append Data to a valid lambda response object
 * @param data response body
 * @param statusCode status code
 * @param additionalOptions additional lambda response property
 * @return Object
 */
export declare function responser(data: any, statusCode?: number, additionalOptions?: {}): {
  body: string;
  headers: {
    "Access-Control-Allow-Origin": string;
  };
  statusCode: number;
};

/**
 * Wraps lambda function to skip ugly things
 * @param func lambda function
 * @param errorHandler customized error handler
 * @param middlewares what lambda should do before executing the other logic
 */
export declare function wrapper(func: THandlerFunction, errorHandler?: TErrorFunction, ...preprocessActions): lambdaFunc;

/**
 * Wraps lambda function to skip ugly things (Non-HTTP)
 * @param func lambda function
 * @param errorHandler customized error handler
 * @param middlewares what lambda should do before executing the other logic
 */
export declare function wrapperNonHttp(func: THandlerFunction, errorHandler?: TErrorFunction, ...preprocessActions): lambdaFunc;
export declare type lambdaFunc = (event: APIGatewayEvent, context: Context) => any;