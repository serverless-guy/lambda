
export function httpLambdaProcessParsedBody(event, context, response) {
  const { name } = event.body

  return response({ myName: name })
}
