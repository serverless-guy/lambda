import { expect } from "chai"
import { resolverNonHttp } from "../../dist"
import { lambdaFuncEmptyResponse } from "../data/lambdaFuncEmptyResponse"
import { lambdaFuncResponseBody } from "../data/lambdaFuncResponseBody"
import { changeNameMiddleware } from "../data/changeNameMiddleware"

describe("Non HTTP Resolver", () => {
  it("should resolve Non HTTP Lambda as undefined", async () => {
    const eventSample = require("../data/non-http-event.json")
    const contextSample = require("../data/context.json")
    const resolved = await resolverNonHttp(eventSample, contextSample, lambdaFuncEmptyResponse)

    expect(resolved).to.be.undefined
  })

  it("should resolve Non HTTP Lambda, return event object", async () => {
    const eventSample = require("../data/non-http-event.json")
    const contextSample = require("../data/context.json")

    const resolved = await resolverNonHttp(eventSample, contextSample, lambdaFuncResponseBody)

    expect(resolved).to.haveOwnProperty("name")
    expect(resolved.name).to.be.equal("John Doe")
  })

  it("should resolve Non HTTP Lambda with middleware, return event object", async () => {
    const eventSample = require("../data/non-http-event.json")
    const contextSample = require("../data/context.json")

    const resolved = await resolverNonHttp(eventSample, contextSample, lambdaFuncResponseBody, changeNameMiddleware)

    expect(resolved).to.haveOwnProperty("name")
    expect(resolved.name).to.be.equal("Joel Mana-ay")
  })
})
