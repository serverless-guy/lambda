import { responser } from "../../../dist"

/**  */
function promiseFunc() {
  return new Promise((resolve, reject) => {
    return resolve({
      hello: "world"
    })
  })
}
/** */
export function lambdaFunctionWithSuccessResponse(event, response) {
  return response({ hello: "world" })
}

export function lambdaFunctionBadRequest(event, response) {
  return response({
    error: "invalid input"
  }, 400)
}

export function lambdaFunctionResponseFunctionNotUsed(event) {
  return {
    hello: "world"
  }
}

export function lambdaFunctionWithPromise(event, response) {
  return Promise.resolve(response({
    hello: "world"
  }))
}

export function lambdaReturnEvents(event, response) {
  return Promise.resolve(response(event))
}

export function lambdaFunctionWithPromiseResponseFunctionNotUsed(event) {
  return Promise.resolve({
    hello: "world"
  })
}

export async function lambdaUsingAsync(event) {
  const response = await promiseFunc()

  return response
}

export function lambdaWrapperErrorHandler(event, error) {
  return responser({
    error: error.message
  }, 400)
}

export function invalidInputLambda(event, response) {
  return new Promise((resolve, reject) => {
    throw new Error("invalid input")
  })
}

export function preprocessorHandler(event, context) {}