export function checkBody(request, next) {
  const { event } = request;

  const body = parse(event.body);

  if (!body.sampleValue1) {
    throw new Error("Validation Failed");
  }

  return next(request);
}

function parse(body) {
  if (!body) {
    return {}
  }

  return JSON.parse(body);
}
