import { expect } from "chai"
import { resolver } from "../../dist"
import {
  lambdaFunctionBadRequest,
  lambdaFunctionWithPromise,
  lambdaFunctionWithPromiseResponseFunctionNotUsed,
  lambdaFunctionResponseFunctionNotUsed,
  lambdaFunctionWithSuccessResponse
} from "./data/lambdas"
import { resolver200response, resolver400response } from "./data/expected"


describe("Utility: Resolver", () => {
  it("should resolve lambda function", async () => {
    const resolveHandler = await resolver({}, {}, lambdaFunctionWithSuccessResponse)

    expect(resolveHandler).to.deep.equal(resolver200response)
  })

  it("should resolve lambda function without using response function", async () => {
    const resolveHandler = await resolver({}, {}, lambdaFunctionResponseFunctionNotUsed)

    expect(resolveHandler).to.deep.equal(resolver200response)
  })

  it("should resolve promised lambda function", async () => {
    const resolveHandler = await resolver({}, {}, lambdaFunctionWithPromise)

    expect(resolveHandler).to.deep.equal(resolver200response)
  })

  it("should resolve promised lambda function without using response function", async () => {
    const resolveHandler = await resolver({}, {}, lambdaFunctionWithPromiseResponseFunctionNotUsed)

    expect(resolveHandler).to.deep.equal(resolver200response)
  })

  it("should resolve lambda with 400 status", async () => {
    const resolveHandler = await resolver({}, {}, lambdaFunctionBadRequest)

    expect(resolveHandler).to.deep.equal(resolver400response)
  })
})
