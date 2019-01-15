
export function middlewareNoNext(request, next) {
  request.event.body.name = "Joel Mana-ay"
}
