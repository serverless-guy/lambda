
import { APIGatewayProxyResult, APIGatewayEvent, Context } from "aws-lambda";
import { Responser } from "@lambda/types/responser.type";

const HTTP_SERVER_ERROR = 500;

/**
 * Default error responser
 * @param error Error
 * @param response ResponseFunction
 * @return APIGatewayProxyResult
 */
export function defaultCatch(error: Error, event: APIGatewayEvent, context: Context, response: Responser): APIGatewayProxyResult {
  const errorResponseObject = {
    errorCode:    error.name,
    errorMessage: error.message
  };

  return response(errorResponseObject, HTTP_SERVER_ERROR);
}
