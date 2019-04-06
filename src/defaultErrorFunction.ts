import { ResponserFunction } from "@lambda/types"

/**
 * Default error responser
 * @param event APIGatewayEvent
 * @param error any
 * @return ...
 */
export function defaultErrorFunction(error: Error, responser: ResponserFunction) {
  return responser({
    errorCode: error.name,
    errorMessage: error.message
  }, 500);
}
