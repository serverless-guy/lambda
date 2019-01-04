import { APIGatewayEvent } from "aws-lambda"
import { responser } from "@lambda/resolver"

/**
 * Default error responser
 * @param event APIGatewayEvent
 * @param error any
 * @return IResponseFuncResponse
 */
export function defaultErrorFunc(event: APIGatewayEvent, error: any) {
  console.error("Something went wrong:", error.stack)

  return responser({
    errorCode: error.name,
    errorMessage: error.message
  }, 500)
}
