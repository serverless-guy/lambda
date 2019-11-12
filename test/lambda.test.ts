import { context } from "./fakes/context";
import { event } from "./fakes/event";
import { helloWorld } from "./fakes/handlers/helloWorld.handler";
import { validation } from "./fakes/handlers/validation.handler";
import { addTimeStamp } from "./fakes/handlers/addTimeStamp.middleware";
import { withError } from "./fakes/handlers/withError.middleware";
import { checkBody } from "./fakes/handlers/checkBody.middleware";
import { parseBody } from "./fakes/handlers/parseBody.middleware";
import { ok } from "./fakes/handlers/ok.responser";
import { faulty } from "./fakes/handlers/faulty.responser";
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

  it("should use custom responser function", async () => {
    const localEvent = { ...event };
    const handler = await wrapper(helloWorld);

    handler.setResponseTemplate(ok);

    const response = await handler(localEvent, context);

    expect(response).to.haveOwnProperty("body");
    expect(response).to.haveOwnProperty("statusCode");

    const body = JSON.parse(response.body);

    expect(body).to.haveOwnProperty("message");
    expect(body).to.haveOwnProperty("user");
    expect(body).to.haveOwnProperty("Powered-By");
    expect(body["Powered-By"]).to.be.equal("Custom Responser");
    expect(body.message).to.be.equal("Hello World!");
    expect(body.user).to.be.equal("anonymouse");
  });

  it("should use custom error responser function", async () => {
    const localEvent = { ...event };
    const handler = await wrapper(validation);

    handler.pushMiddleware(checkBody);
    handler.setCatchTemplate(faulty);

    const response = await handler(localEvent, context);

    expect(response).to.haveOwnProperty("body");
    expect(response).to.haveOwnProperty("statusCode");
    expect(response.statusCode).to.be.equal(500);

    const body = JSON.parse(response.body);

    expect(body).to.haveOwnProperty("errorCode");
    expect(body).to.haveOwnProperty("errorMessage");
    expect(body).to.haveOwnProperty("customError");
    expect(body.customError).to.be.true;
    expect(body.errorCode).to.be.equal("Error");
    expect(body.errorMessage).to.be.equal("Validation Failed");
  });

  it("should chain middlewares", async () => {
    const localEvent = { ...event };
    const handler = await wrapper(validation);

    handler.pushMiddlewares(
      parseBody,
      addTimeStamp
    );

    handler.setCatchTemplate(faulty);

    localEvent.body = JSON.stringify({ sampleValue1: "testing..." });

    const response = await handler(localEvent, context);

    expect(response).to.haveOwnProperty("body");
    expect(response).to.haveOwnProperty("statusCode");
    expect(response.statusCode).to.be.equal(200);

    const body = JSON.parse(response.body);

    expect(body).to.haveOwnProperty("generatedAt");
    expect(body).to.haveOwnProperty("message");
    expect(body).to.haveOwnProperty("user");
    expect(body.message).to.be.equal("testing...");
    expect(body.user).to.be.equal("anonymouse");
    expect(body.generatedAt).to.be.equal("2019-11-12");
  });

  it("should resolve middleware without return value", async () => {
    const localEvent = { ...event };
    const handler = await wrapper(helloWorld);

    handler.pushMiddlewares(
      parseBody,
      addTimeStamp,
      withError
    );

    handler.setCatchTemplate(faulty);

    localEvent.body = JSON.stringify({ sampleValue1: "testing..." });

    const response = await handler(localEvent, context);

    expect(response).to.haveOwnProperty("body");
    expect(response).to.haveOwnProperty("statusCode");
    expect(response.statusCode).to.be.equal(500);
  });
});
