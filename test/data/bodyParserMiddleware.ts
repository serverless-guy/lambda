
export function bodyParserMiddleware(request, next) {
  request.event.body = JSON.parse(request.event.body)
}
