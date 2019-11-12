export function parseBody(request, next) {
  const { event, context } = request;

  event.body =  typeof event.body === "string" ? parse(event.body) : event.body;

  return next({ event, context });
}

function parse(body) {
  if (!body) {
    return {}
  }

  return JSON.parse(body);
}
