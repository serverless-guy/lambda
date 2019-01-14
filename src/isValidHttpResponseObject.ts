/**
* Check if it's valid lambda response object
* @param response response body
* @return Object
*/
export function isValidHttpResponseObject(response: any) {
  if (!response) {
    return false
  }

  const hasBody       = response.hasOwnProperty("body")
  const hasHeaders    = response.hasOwnProperty("headers")
  const hasStatusCode = response.hasOwnProperty("statusCode")

  return (hasBody && hasHeaders && hasStatusCode)
}
