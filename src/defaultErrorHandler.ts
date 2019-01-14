import { APIGatewayEvent } from "aws-lambda"
import { responser } from "@lambda/responser"

/**
 * Default error responser
 * @param event APIGatewayEvent
 * @param error any
 * @return IResponseFuncResponse
 */
export function defaultErrorHandler(event: APIGatewayEvent, error: Error) {
  return responser({
    errorCode: error.name,
    errorMessage: error.message
  }, 500)
}
