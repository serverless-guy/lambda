import { expect } from "chai"
import { wrapper } from "../../dist"
import { bodyParserMiddleware } from "../data/bodyParserMiddleware"
import { middlewareNoNext } from "../data/middlewareNoNext"
import { httpLambdaFuncEmptyResponse } from "../data/httpLambdaFuncEmptyResponse"
import { httpLambdaProcessParsedBody } from "../data/httpLambdaProcessParsedBody"

describe("HTTP Resolver", () => {
  it("should resolve HTTP Lambda without response", async (done) => {
    const eventSample = require("../data/event.json")
    const contextSample = require("../data/context.json")
    const resolved = await wrapper({
      handler: httpLambdaProcessParsedBody,
      before: [ bodyParserMiddleware ]
    })(eventSample, contextSample)


  })
})
