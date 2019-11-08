import { APIGatewayProxyResult } from "aws-lambda";
import { Headers } from "../../types/headers.type";

/**
 * Default responser
 * @param data data for response
 * @return APIGatewayProxyResult
 */
export function ok(data: any, statusCode: number = 200, headers: Headers = {}): APIGatewayProxyResult {
  return {
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Origin": "*",
      ...headers
    },
    statusCode
  };
}
