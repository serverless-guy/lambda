import { APIGatewayProxyResult } from "aws-lambda";
import { Headers } from "../../types/headers.type";

/**
 * Default responser
 * @param data data for response
 * @return APIGatewayProxyResult
 */
export function ok(data: any, statusCode = 200, headers: Headers = {}): APIGatewayProxyResult { // eslint-disable-line
  return {
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Origin": "*",
      ...headers
    },
    statusCode
  };
}
