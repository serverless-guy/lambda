import { middlewareHandler } from "@lambda/middlewareHandler"
import { httpResponseHandler } from "@lambda/httpResponseHandler"
import { THandlerFunction } from "@lambda/THandlerFunction"
import { APIGatewayEvent, Context } from "aws-lambda"

export function resolver(event: APIGatewayEvent, context: Context, func: THandlerFunction, ...middlewares) {
  return new Promise((resolve) => resolve(
    middlewareHandler(event, context, ...middlewares)
  )).then(() => httpResponseHandler(event, func))
}
