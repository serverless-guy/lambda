export function addTimeStamp(request, next) {
  const { event, context } = request;

  event.body.generatedAt = "2019-11-12";

  return next({ event, context });
}
