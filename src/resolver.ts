import { chain } from "@lambda/chain"
import { APIGatewayEvent, Context } from "aws-lambda"

export type Handler = (event?: APIGatewayEvent, context?: Context, res?: any) => any

export function resolver(event: APIGatewayEvent, context: Context, lambdaHandler: Handler, preprocessAction: any): any {
  return new Promise((resolve, reject) => {
    if (!preprocessAction) {
      return resolve(handleLambdaHandler(event, lambdaHandler, responser))
    }

    return chain(
      preprocessAction(event, context),
      handleLambdaHandler(event, lambdaHandler, responser)
    ).then(resolve).catch(reject)
  })
}

/**
 * Handle lambda handler
 * @param event APIGatewayEvent
 * @param lambdaHandler Lambda Handler function
 * @param response response function
 * @return func
 */
function handleLambdaHandler(event, lambdaHandler, response) {
  const handler = lambdaHandler(event, response)

  if (!handler.then) {
    return wrapResponse(handler)
  }

  return handler.then(wrapResponse)
}

/**
 * Check if it's valid lambda response object
 * @param response response body
 * @return Object
 */
function validLambdaResponseObject(response) {
  const hasBody       = response.hasOwnProperty("body")
  const hasHeaders    = response.hasOwnProperty("headers")
  const hasStatusCode = response.hasOwnProperty("statusCode")

  return (hasBody && hasHeaders && hasStatusCode)
}

/**
 * Check if object thrown is a valid lambda response object
 * wrap if it's not
 * @param response response body
 * @return Object
 */
function wrapResponse(response) {
  if (!validLambdaResponseObject(response)) {
    return {
      body: JSON.stringify(response),
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      statusCode: 200
    }
  }

  return response
}

/**
 * Append Data to a valid lambda response object
 * @param data response body
 * @param statusCode status code
 * @param additionalOptions additional lambda response property
 * @return Object
 */
export function responser(data, statusCode = 200, additionalOptions = {}) {
  return {
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    statusCode: statusCode ? statusCode : 200,
    ...additionalOptions
  }
}
