import { context } from "./fakes/context";
import { event } from "./fakes/event";
import { helloWorld } from "./fakes/handlers/helloWorld.handler";
import { validation } from "./fakes/handlers/validation.handler";
import { checkBody } from "./fakes/handlers/checkBody.middleware";
import * as chai from "chai";
import * as promisedChai from "chai-as-promised";
import { wrapper } from "../src/wrapper";

describe("wrapper", () => {
  const { expect } = chai;

  before(() => {
    chai.use(promisedChai);
  });

  it("should resolve basic handler", async () => {
    const localEvent = { ...event };
    const response = await wrapper(helloWorld)(localEvent, context);

    expect(response).to.haveOwnProperty("body");

    const body = JSON.parse(response.body);

    expect(body).to.haveOwnProperty("message");
    expect(body).to.haveOwnProperty("user");
    expect(body.message).to.be.equal("Hello World!");
    expect(body.user).to.be.equal("anonymouse");
  });

  it("should resolve handler with validation middleware (validation success)", async () => {
    const localEvent = { ...event };
    const handler = await wrapper(validation);

    handler.pushMiddleware(checkBody);

    localEvent.body = JSON.stringify({ sampleValue1: "testing..." });

    const response = await handler(localEvent, context);

    expect(response).to.haveOwnProperty("body");

    const body = JSON.parse(response.body);

    expect(body).to.haveOwnProperty("message");
    expect(body).to.haveOwnProperty("user");
    expect(body.message).to.be.equal("testing...");
    expect(body.user).to.be.equal("anonymouse");
  });

  it("should resolve handler with validation middleware (validation fail)", async () => {
    const localEvent = { ...event };
    const handler = await wrapper(validation);

    handler.pushMiddleware(checkBody);

    const response = await handler(localEvent, context);

    expect(response).to.haveOwnProperty("body");
    expect(response).to.haveOwnProperty("statusCode");
    expect(response.statusCode).to.be.equal(500);

    const body = JSON.parse(response.body);

    expect(body).to.haveOwnProperty("errorCode");
    expect(body).to.haveOwnProperty("errorMessage");
    expect(body.errorCode).to.be.equal("Error");
    expect(body.errorMessage).to.be.equal("Validation Failed");
  });
});
