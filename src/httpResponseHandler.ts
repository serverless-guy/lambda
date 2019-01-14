import { responser } from "@lambda/responser"
import { wrapHttpResponse } from "@lambda/wrapHttpResponse"
import { THandlerFunction } from "@lambda/THandlerFunction"
import { APIGatewayEvent } from "aws-lambda"

export function httpResponseHandler(event: APIGatewayEvent, lambdaFunc: THandlerFunction) {
  let handler = lambdaFunc(event, responser)

  if (!handler) {
    handler = {}
  }

  if (!handler.then) {
    return wrapHttpResponse(handler)
  }

  return handler.then(wrapHttpResponse)
}
