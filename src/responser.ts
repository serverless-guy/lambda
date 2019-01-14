
/**
 * Append Data to a valid lambda response object
 * @param data response body
 * @param statusCode status code
 * @param additionalOptions additional lambda response property
 * @return Object
 */
export function responser(data: any, statusCode = 200, additionalOptions = {}) {
  return {
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    statusCode: statusCode ? statusCode : 200,
    ...additionalOptions
  }
}
