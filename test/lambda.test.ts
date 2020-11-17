import { context } from "./fakes/context";
import { event } from "./fakes/event";
import { helloWorld } from "./fakes/handlers/helloWorld.handler";
import { validation } from "./fakes/handlers/validation.handler";
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

  it("should use custom responser function", async () => {
    const localEvent = { ...event };
    const handler = wrapper(helloWorld);

    handler.setResponseFunction(ok);

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

  it("should use default error responser function", async () => {
    const localEvent = { ...event };
    const handler = wrapper(validation);

    localEvent.body = "{}";

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

  it("should use custom error responser function", async () => {
    const localEvent = { ...event };
    const handler = wrapper(validation);

    handler.setCatchFunction(faulty);

    localEvent.body = "{}";

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
});
