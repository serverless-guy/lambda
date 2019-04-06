import { APIGatewayProxyResult } from "aws-lambda"

/**
 * Default responser
 * @param data data for response
 * @return any
 */
export function httpResponser(data: any): APIGatewayProxyResult {
  return {
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    statusCode: 200
  }
}
