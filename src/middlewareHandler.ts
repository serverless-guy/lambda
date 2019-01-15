import { noop } from "@lambda/utils/noop"

/**
 * Function responsible for resolving middlewares
 * @param event APIGatewayEvent
 * @param context Context
 * @param middlewares Array
 * @return any
 */
export function middlewareHandler(event: any, context: any, ...middlewares) {
  if (!middlewares.length) {
    return undefined
  }

  const executedReturnsFunc = middlewares.reduce((accumulator, current) => {
    return accumulator({ event, context }, () => current)
  })

  if (!executedReturnsFunc) {
    return executedReturnsFunc
  }

  return executedReturnsFunc({ event, context }, () => noop)
}