import { isValidHttpResponseObject } from "@lambda/isValidHttpResponseObject"

/**
 * Check if object thrown is a valid lambda response object
 * wrap if it's not
 * @param response response body
 * @return Object
 */
export function wrapHttpResponse(response: any) {
  if (!isValidHttpResponseObject(response)) {
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