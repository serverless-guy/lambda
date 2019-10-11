import { APIGatewayProxyResult } from "aws-lambda";
import { ResponseFunction } from "../types";

const HTTP_SERVER_ERROR = 500;

/**
 * Default error responser
 * @param error Error
 * @param response ResponseFunction
 * @return APIGatewayProxyResult
 */
export function error(error: Error, response: ResponseFunction): APIGatewayProxyResult {
  const errorResponseObject = {
    errorCode:    error.name,
    errorMessage: error.message
  };

  return response(errorResponseObject, HTTP_SERVER_ERROR);
}
