export function withError(request, next) {
  throw Error("throw me however you like.");
}
