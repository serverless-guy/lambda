
import { APIGatewayEvent, Context } from "aws-lambda";


export declare type ErrorFunc = (event?: APIGatewayEvent, error?: any) => any
export declare type HandlerFunc = (event?: APIGatewayEvent, responser?: ResponseFunc) => any
export declare type ResponseFunc = (data: any, statusCode?: number, additionalOptions?: any) => IResponseFuncResponse
export declare function defaultErrorFunc(event: APIGatewayEvent, error: any): IResponseFuncResponse;
export declare function resolver(event: APIGatewayEvent, context: Context, lambdaHandler: HandlerFunc, ...preprocessActions): any;
export declare interface IResponseFuncResponse {
  body?: string,
  headers?: any,
  statusCode?: number,
  isBase64Encoded?: boolean
}

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
 * Chain function via Promise
 * @param functions functions to be executed
 * @return Promise
 */
export declare function chain(...functions: any[]): any;

/**
 * Wraps lambda function to skip ugly things
 * @param func lambda function
 * @param preprocessAction what lambda should do before executing the other logic
 * @param errorHandler customized error handler
 */
export declare function lambdaWrapper(func: any, errorHandler?: ErrorFunc, ...preprocessActions): (event: APIGatewayEvent, context: Context) => any;
