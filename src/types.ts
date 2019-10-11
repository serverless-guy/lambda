import { APIGatewayProxyResult } from "aws-lambda";

export type HeadersType = NonNullable<APIGatewayProxyResult["headers"]>;

export type ResponseFunction = (data: any, statusCode?: number, headers?: HeadersType) => any;

export type ErrorResponseFunction = (error: any, response: ResponseFunction) => any;
