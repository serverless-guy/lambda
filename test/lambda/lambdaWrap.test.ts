import { expect } from "chai"
import { lambdaWrap } from "../../dist"
import { invalidInputLambda, lambdaFunctionWithPromise, lambdaWrapErrorHandler, lambdaUsingAsync, lambdaReturnEvents } from "./data/lambdas"
import { resolver200response, resolver200responseEvent, resolver400response } from "./data/expected"

function noop(event, context) {
  event.body = "{hello:\"world\"}"
}

function noop2(event) {
  event.queryStringParameters = { q: "samplekeyword" }
}

describe("Utility: Lambda Wrapper", () => {
  it("should resolve lambda error function", async () => {
    const resolveHandler = await lambdaWrap(invalidInputLambda, lambdaWrapErrorHandler, noop)({}, {})

    expect(resolveHandler).to.deep.equal(resolver400response)
  })

  it("should resolve lambda", async () => {
    const resolveHandler = await lambdaWrap(lambdaFunctionWithPromise, lambdaWrapErrorHandler, noop)({}, {})

    expect(resolveHandler).to.deep.equal(resolver200response)
  })

  it("should resolve lambda (multiple preprocess actions)", async () => {
    const resolveHandler = await lambdaWrap(lambdaReturnEvents, lambdaWrapErrorHandler, noop, noop2)({}, {})

    expect(resolveHandler).to.deep.equal(resolver200responseEvent)
  })

  it("should resolve lambda (no error handler)", async () => {
    const resolveHandler = await lambdaWrap(lambdaFunctionWithPromise)({}, {})

    expect(resolveHandler).to.deep.equal(resolver200response)
  })

  it("should resolve lambda (async)", async () => {
    const resolveHandler = await lambdaWrap(lambdaUsingAsync)({}, {})

    expect(resolveHandler).to.deep.equal(resolver200response)
  })
})
