
export function httpLambdaProcessParsedBody(event, response) {
  const { name } = event.body

  return response({ myName: name })
}
