import { expect } from "chai"
import { wrapper } from "../../dist"
import { httpLambdaFuncEmptyResponse } from "../data/httpLambdaFuncEmptyResponse"

describe("HTTP Wrapper", () => {
  it("should resolve HTTP Lambda without response", async () => {
    const eventSample = require("../data/event.json")
    const contextSample = require("../data/context.json")
    const resolved = await wrapper(httpLambdaFuncEmptyResponse)(eventSample, contextSample)

    expect(resolved).to.haveOwnProperty("body")
    expect(resolved.body).to.deep.equal("{}")
    expect(resolved).to.haveOwnProperty("statusCode")
    expect(resolved.statusCode).to.equal(200)
  })
})
