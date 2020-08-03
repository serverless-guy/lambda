import { APIGatewayProxyResult } from "aws-lambda";
import { Responser } from "@lambda/types/responser.type";
import { Request } from "@lambda/types/request.type";

const HTTP_SERVER_ERROR = 500;

/**
 * Default error responser
 * @param error Error
 * @param response ResponseFunction
 * @return APIGatewayProxyResult
 */
export function faulty(error: Error, request: Request, response: Responser): APIGatewayProxyResult {
  const errorResponseObject = {
    errorCode:    error.name,
    errorMessage: error.message
  };

  return response(errorResponseObject, HTTP_SERVER_ERROR);
}
