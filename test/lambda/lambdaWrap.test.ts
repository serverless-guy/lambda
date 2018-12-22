import { expect } from "chai"
import { lambdaWrap } from "../../dist"
import { invalidInputLambda, lambdaFunctionWithPromise, lambdaWrapErrorHandler } from "./data/lambdas"
import { resolver200response, resolver400response } from "./data/expected"

function noop() {}

describe("Utility: Lambda Wrapper", () => {
  it("should resolve lambda error function", async () => {
    const resolveHandler = await lambdaWrap(invalidInputLambda, noop, lambdaWrapErrorHandler)({}, {})

    expect(resolveHandler).to.deep.equal(resolver400response)
  })

  it("should resolve lambda", async () => {
    const resolveHandler = await lambdaWrap(lambdaFunctionWithPromise, noop, lambdaWrapErrorHandler)({}, {})

    expect(resolveHandler).to.deep.equal(resolver200response)
  })
})
