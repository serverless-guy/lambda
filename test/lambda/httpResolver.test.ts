import { expect } from "chai"
import { resolver } from "../../dist"
import { bodyParserMiddleware } from "../data/bodyParserMiddleware"
import { middlewareNoNext } from "../data/middlewareNoNext"
import { httpLambdaFuncEmptyResponse } from "../data/httpLambdaFuncEmptyResponse"
import { httpLambdaProcessParsedBody } from "../data/httpLambdaProcessParsedBody"

describe("HTTP Resolver", () => {
  it("should resolve HTTP Lambda without response", async () => {
    const eventSample = require("../data/event.json")
    const contextSample = require("../data/context.json")
    const resolved = await resolver(eventSample, contextSample, httpLambdaFuncEmptyResponse)

    expect(resolved).to.haveOwnProperty("body")
    expect(resolved.body).to.deep.equal("{}")
    expect(resolved).to.haveOwnProperty("statusCode")
    expect(resolved.statusCode).to.equal(200)
  })

  it("should resolve HTTP Lambda with middleware", async () => {
    const eventSample = { ...require("../data/event.json") }
    const contextSample = { ...require("../data/context.json") }
    const resolved = await resolver(eventSample, contextSample, httpLambdaProcessParsedBody, bodyParserMiddleware)

    expect(resolved).to.haveOwnProperty("body")
    expect(JSON.parse(resolved.body).myName).to.equal("John Doe")
    expect(resolved).to.haveOwnProperty("statusCode")
    expect(resolved.statusCode).to.equal(200)
  })

  it("should not throw an error if next is not invoked", async () => {
    const eventSample = require("../data/event.json")
    const contextSample = require("../data/context.json")
    const resolved = await resolver(
      eventSample,
      contextSample,
      httpLambdaProcessParsedBody,
      bodyParserMiddleware,
      middlewareNoNext
    )

    expect(resolved).to.haveOwnProperty("body")
    expect(JSON.parse(resolved.body).myName).to.equal("John Doe")
    expect(resolved).to.haveOwnProperty("statusCode")
    expect(resolved.statusCode).to.equal(200)
  })
})
