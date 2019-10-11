import { APIGatewayProxyResult } from "aws-lambda";
import { HeadersType } from "../types";

/**
 * Default responser
 * @param data data for response
 * @return APIGatewayProxyResult
 */
export function http(data: any, statusCode: number = 200, headers: HeadersType = {}): APIGatewayProxyResult {
  return {
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Origin": "*",
      ...headers
    },
    statusCode
  };
}
