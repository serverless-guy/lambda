import { APIGatewayProxyResult } from "aws-lambda";
import { Headers } from "../../../src/types/headers.type";

export function ok(data: any, statusCode: number = 200, headers: Headers = {}): APIGatewayProxyResult {
  data = data ? data : {};

  data["Powered-By"] = "Custom Responser";

  return {
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Origin": "*",
      ...headers
    },
    statusCode
  };
}
