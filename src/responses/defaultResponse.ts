import { APIGatewayProxyResult } from "aws-lambda";

/**
 * Default response function used by the wrapper
 * @param data desired response body in JSON format
 * @param statusCode desired HTTP status code of the response
 * @return APIGatewayProxyResult
 */
export function defaultResponse(data: any, statusCode = 200): APIGatewayProxyResult { // eslint-disable-line
  return {
    body: JSON.stringify(data),
    statusCode
  };
}
