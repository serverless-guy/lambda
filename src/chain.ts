/**
 * Chain function via Promise
 * @param functions functions to be executed
 * @return Promise
 */
export function chain(...functions: any[]): any {
  return Promise.all(functions).then(getLastPerformedFunction)
}

/**
 * Get last performed function, treat it as the response
 * @param response response Promise return value
 * @return any
 */
function getLastPerformedFunction(response: any): any {
  const lastPerformedFunction = response[response.length - 1]

  return lastPerformedFunction
}
