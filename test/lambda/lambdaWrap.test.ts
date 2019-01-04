import { expect } from "chai"
import { lambdaWrapper } from "../../dist"
import { invalidInputLambda, lambdaFunctionWithPromise, lambdaWrapperErrorHandler, lambdaUsingAsync, lambdaReturnEvents } from "./data/lambdas"
import { resolver200response, resolver200responseEvent, resolver400response, resolver500response } from "./data/expected"

function noop(event, context) {
  event.body = "{hello:\"world\"}"
}

function noop2(event) {
  event.queryStringParameters = { q: "samplekeyword" }
}

describe("Utility: Lambda Wrapper", () => {
  it("should resolve lambda error function", async () => {
    const resolveHandler = await lambdaWrapper(invalidInputLambda, lambdaWrapperErrorHandler, noop)({}, {})

    expect(resolveHandler).to.deep.equal(resolver400response)
  })

  it("should resolve lambda", async () => {
    const resolveHandler = await lambdaWrapper(lambdaFunctionWithPromise, lambdaWrapperErrorHandler, noop)({}, {})

    expect(resolveHandler).to.deep.equal(resolver200response)
  })

  it("should resolve lambda (multiple preprocess actions)", async () => {
    const resolveHandler = await lambdaWrapper(lambdaReturnEvents, lambdaWrapperErrorHandler, noop, noop2)({}, {})

    expect(resolveHandler).to.deep.equal(resolver200responseEvent)
  })

  it("should resolve lambda (no error handler)", async () => {
    const resolveHandler = await lambdaWrapper(lambdaFunctionWithPromise)({}, {})

    expect(resolveHandler).to.deep.equal(resolver200response)
  })

  it("should resolve lambda (async)", async () => {
    const resolveHandler = await lambdaWrapper(lambdaUsingAsync)({}, {})

    expect(resolveHandler).to.deep.equal(resolver200response)
  })

  it("should catch and response", async () => {
    const resolveHandler = await lambdaWrapper(invalidInputLambda, undefined)({}, {})

    expect(resolveHandler).to.deep.equal(resolver500response)
  })

  it("should catch and response (with preprocess functions)", async () => {
    const resolveHandler = await lambdaWrapper(invalidInputLambda, undefined, noop, noop2)({}, {})

    expect(resolveHandler).to.deep.equal(resolver500response)
  })
})
