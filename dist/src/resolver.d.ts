import { APIGatewayEvent, Context } from "aws-lambda";
export declare type Handler = (event?: APIGatewayEvent, context?: Context, res?: any) => any;
export declare function resolver(event: APIGatewayEvent, context: Context, lambdaHandler: Handler, preprocessAction: any): any;
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
