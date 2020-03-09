import { APIGatewayProxyResult } from "aws-lambda";
import { Responser } from "../../../src/types/responser.type";
import { Request } from "../../../src/types/request.type";

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
    errorMessage: error.message,
    customError: true
  };

  return response(errorResponseObject, HTTP_SERVER_ERROR, {
    "Powered-By": "Error"
  });
}
